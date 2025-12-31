/* ===============================
   DEPOSIT LOGIC
=============================== */
let depositAmount = 0;
let isPwdConfirmed = false;

/**
 * Add value to deposit
 * @param {number} valueToAdd 
 */
function addDeposit(valueToAdd) {
    depositAmount += valueToAdd;
    const amountInput = document.getElementById('deposit-amount');
    if (amountInput) {
        amountInput.value = depositAmount;
    }
}

/**
 * Reset deposit value
 */
function resetDeposit() {
    depositAmount = 0;
    const amountInput = document.getElementById('deposit-amount');
    if (amountInput) {
        amountInput.value = "";
    }
}

/* ===============================
   DEPOSIT PASSWORD CONFIRMATION
=============================== */
function confirmDepositPassword() {
    const pwdInput = document.getElementById('deposit-password');
    const replaceContainer = document.getElementById('dep_pwconfirm_replace');

    if (!pwdInput || !replaceContainer) return;

    if (pwdInput.value.trim() === "") {
        alert("입금 계좌를 요청후 신청해주세요.");
        return false;
    }

    isPwdConfirmed = true;

    // Replace content with bank info
    replaceContainer.innerHTML = "&nbsp;&nbsp;은행명 : 국민은행 계좌번호 : 636501 04 309015 예금주 : (유)씨제이플러스";
}

/* ===============================
   DEPOSIT FORM VALIDATION
=============================== */
function validateDepositForm() {
    const form = document.forms['DepositFunction'];
    const amountInput = document.getElementById('deposit-amount');
    const selectedGame = form ? form['game'].value : "";

    if (!selectedGame) {
        alert("신청하실 게임종류를 선택해주세요.");
        return false;
    }

    if (!amountInput || amountInput.value.trim() === "") {
        alert("충전금액은 최저 20,000원 부터 1만원 단위로만 충전가능합니다.");
        return false;
    }

    if (!isPwdConfirmed) {
        alert("입금 계좌를 요청후 신청해주세요.");
        return false;
    }

    const confirmMsg = `신청하신 금액은 ${amountInput.value} 원입니다.\n입금 신청 하시겠습니까?`;
    if (confirm(confirmMsg)) {
        alert("머니충전 신청이 접수되었습니다.\n은행의 통장 입금이 완료되는대로 충전이 이루어집니다.");
        return true;
    } else {
        return false;
    }
}

/* ===============================
   EXPORT FUNCTIONS FOR HTML
=============================== */
window.d_add = addDeposit;
window.d_reset = resetDeposit;
window.passConfirm = confirmDepositPassword;
window.depositValidate = validateDepositForm;

/* WITHDRAW AMOUNT CONTROL */
var withdrawAmount = 0;

function w_add(valueToAdd) {
    withdrawAmount += valueToAdd;
    document.getElementById("withdraw-amount").value = withdrawAmount;
}

function w_reset() {
    withdrawAmount = 0;
    document.getElementById("withdraw-amount").value = "";
}

/* WITHDRAW VALIDATION */
function withdrawValidate() {
    var amountInput = document.getElementById("withdraw-amount");
    var passwordInput = document.getElementById("withdraw-password");
    var gameChecked = document.querySelector('input[name="withdraw-game"]:checked');

    if (!gameChecked) {
        alert("신청하실 게임종류를 선택해주세요.");
        return false;
    }

    if (amountInput.value === "" || amountInput.value < 50000) {
        alert("환전금액은 최저 50,000원부터 10,000원 단위만 환전가능합니다.");
        return false;
    }

    if (passwordInput.value === "") {
        alert("환전 비밀번호를 입력해주세요.");
        return false;
    }

    if (confirm("신청하신 금액은 " + amountInput.value + " 원입니다.\n출금 신청 하시겠습니까?")) {
        alert("출금 신청이 접수되었습니다.\n잠시만 기다려주세요.");
        return true;
    }

    return false;
}
// Account Number
document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("acctnumber-option");

    if (!select) return; // 👈 prevents null error

    const basic = document.getElementById("bank-basic");
    const accountA = document.getElementById("bank-a");
    const accountB = document.getElementById("bank-b");

    function updateAccountInput() {
        if (basic) basic.classList.add("input-hidden");
        if (accountA) accountA.classList.add("input-hidden");
        if (accountB) accountB.classList.add("input-hidden");

        if (select.value === "basicaccount" && basic) {
            basic.classList.remove("input-hidden");
        }

        if (select.value === "accountA" && accountA) {
            accountA.classList.remove("input-hidden");
        }

        if (select.value === "accountB" && accountB) {
            accountB.classList.remove("input-hidden");
        }
    }

    select.addEventListener("change", updateAccountInput);
    updateAccountInput();
});


/* TRANSFER VALIDATION */
function transferValidate() {
    const form = document.forms["transfer-form"];
    if (!form) {
        console.error("transfer-form not found");
        return false;
    }

    const fromGame = form.querySelector('input[name="from-game"]:checked');
    const toGame = form.querySelector('input[name="to-game"]:checked');
    const amountInput = document.getElementById("transfer-amount");

    if (!fromGame) {
        alert("보내는 게임종류를 선택해주세요.");
        return false;
    }

    if (!toGame) {
        alert("받는 게임종류를 선택해주세요.");
        return false;
    }

    if (fromGame.value === toGame.value) {
        alert("보내는 게임과 받는 게임을 다르게 선택해주세요.");
        return false;
    }

    if (!amountInput || amountInput.value === "") {
        alert("이동할 금액을 입력해 주세요.");
        return false;
    }

    if (Number(amountInput.value) < 20000) {
        alert("머니이동금액은 최소 20,000원 이상입니다.");
        return false;
    }

    const confirmMsg =
        "신청하신 금액은 " +
        amountInput.value +
        " 원입니다.\n이동 신청 하시겠습니까?";

    if (confirm(confirmMsg)) {
        alert("Transfer successful!");
        return true;
    }

    return false;
}
