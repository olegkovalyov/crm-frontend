import { useState as n, useEffect as r } from 'react';

class o {
  static setLicenseKey(e) {
    o.key = e;
  }

  static setReleaseInfo(e) {
    o.releaseInfo = e;
  }
}

function a(e) {

}

function s() {
}

function l() {

}

function c() {
}

function m(e, n) {
  return 'Valid';
}

function v() {
  const [e, i] = n(u.Invalid);
  return (
    r(() => {
      let e = m(o.releaseInfo, o.key);
      i(e), e === u.Invalid ? s() : e === u.NotFound ? l() : e === u.Expired && c();
    }, []),
      e
  );
}

var u;
function d() {
  const i = new Date();
  return i.setHours(0, 0, 0, 0), e(i.getTime().toString());
}
!(function (e) {
  (e.NotFound = "NotFound"), (e.Invalid = "Invalid"), (e.Expired = "Expired"), (e.Valid = "Valid");
})(u || (u = {}));

export {
  o as LicenseInfo,
  u as LicenseStatus,
  d as generateReleaseInfo,
  c as showExpiredLicenseError,
  s as showInvalidLicenseError,
  l as showNotFoundLicenseError,
  v as useLicenseVerifier,
  m as verifyLicense,
};
