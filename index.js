/**
 * Nguyên nhân chính là trong threadpool có 4 thread. Mà fs(file system req tới file 2 lần => asyc)
 * Xử lý bằng cách tăng zise threadpool lên
 * Hơn nữa http được xử lý riêng (OS xử lý) chứ ko phải của NodeJS xử lý
 */

// process.env.UV_THREADPOOL_SIZE = 5;

const fs = require('fs');
const crypto = require('crypto');
const https = require('https');

const start = Date.now();

function fakeReq() {
  https
    .request('https://google.com.vn/', (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log('Request -->', getElapsedTime(start));
      });
    })
    .end();
}

function hash() {
  crypto.pbkdf2('some', 'thing', 100000, 512, 'sha512', () => {
    console.log('Hash -->', getElapsedTime(start));
  });
}

function readOwn() {
  fs.readFile('index.js', 'utf8', () => {
    console.log('Read file -->', getElapsedTime(start));
  });
}

fakeReq();

readOwn();
hash();
hash();
hash();
hash();

/**
 * th1: readOwn() : xử lý đầu tiên xong(đọc StaticFile) chờ res => th1 trống => hash4 sẽ được đưa vào xử lý
 * Sau đó về mặt thời gian thì hash123 xử lý trước nên xong trước =>1 cái được in ra
 *  => có thread trống => fs được đưa vào xử lý(đọc content) => lại chờ res => lại có thread trống nhưng ko còn cái nào để đưa nào xử lý
 * Cái này nếu thêm 1 hast nữa thì 2 hash được in ra đầu tiên
 * Nếu nhiều hash thì hash được ưu tiên xử lý cho xong > đến khi ko còn hash nào chờ nữa
 *  => in ra
 * Cuối cùng thì còn 3 hast được in ra
 *
 * th2: hash1
 * th3: hash2
 * th4: hash3
 *
 */

/**
 *
 * readfile được thread-1 xử lý đầu tiên . Req tới file xong chờ res trả về
 *
 */
function getElapsedTime(time) {
  return (Date.now() - time) / 1000 + 's';
}
