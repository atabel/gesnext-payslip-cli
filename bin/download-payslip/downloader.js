const request = require('request');
const { createWriteStream } = require('fs');

const downloadFile = ({ url, cookies, filePath }) => {
  const cookieJar = request.jar();
  cookies.forEach(({ name, value }) => {
    const cookie = request.cookie(`${name}=${value}`);
    cookieJar.setCookie(cookie, url);
  });

  return new Promise((resolve) => {
    request({ url, jar: cookieJar })
      .pipe(createWriteStream(filePath))
      .on('close', resolve);
  });
};

module.exports = { downloadFile };
