var child_process = require('child_process');

var WIN32_IPCONFIG = 'C:\\Windows\\system32\\ipconfig.exe';
var WIN32_IP_REGEX = /IPv4 Address[\s.:]+([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/;

function getWin32(cb) {
  var hostnames = [];
  if (process.env.COMPUTERNAME)
    hostnames.push(process.env.COMPUTERNAME);

  child_process.exec(WIN32_IPCONFIG, function(err, stdout) {
    if (err) return cb(hostnames);
    stdout.split('\n').forEach(function(line) {
      var match = line.match(WIN32_IP_REGEX);
      if (match) hostnames.push(match[1]);
    });
    cb(hostnames);
  });
}

function getPosix(cb) {
  // TODO: Finish this
}

function get(cb) {
  if (process.platform == 'win32')
    return getWin32(cb);
  return getPosix(cb);
}

module.exports = get;

if (!module.parent)
  get(function(info) {
    console.log(info);
  });
