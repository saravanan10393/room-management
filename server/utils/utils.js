let verifyMobileNo = (mobileNo) => {
    let pattern = /^[0-9]{12}/g
    return pattern.test(mobileNo) && mobileNo.length == 12;
}

export {verifyMobileNo}