document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabName = this.dataset.tab;

      // reset buttons
      buttons.forEach((btn) => {
        const name = btn.dataset.tab;
        btn.classList.remove("active");
        btn.src = "images/inactive-" + name + "-menu-button.png";
      });

      // reset panels
      panels.forEach((panel) => {
        panel.classList.remove("active");
      });

      // activate selected
      this.classList.add("active");
      this.src = "images/active-" + tabName + "-menu-button.png";
      document.getElementById(tabName).classList.add("active");
    });
  });
});

// ===== Live scroll fake data =====
/* ================================
   FAKE LIVE DATA
================================ */

const depositData = [
  ["USER***01", "100,000원", "07-09 | 01:01 PM"],
  ["USER***02", "250,000원", "07-09 | 01:02 PM"],
  ["USER***03", "180,000원", "07-09 | 01:03 PM"],
  ["USER***04", "300,000원", "07-09 | 01:04 PM"],
  ["USER***05", "120,000원", "07-09 | 01:05 PM"],
];

const withdrawData = [
  ["NAME***01", "100,000원", "07-09 | 01:01 PM"],
  ["NAME***02", "250,000원", "07-09 | 01:02 PM"],
  ["NAME***03", "180,000원", "07-09 | 01:03 PM"],
  ["NAME***04", "300,000원", "07-09 | 01:04 PM"],
  ["NAME***05", "120,000원", "07-09 | 01:05 PM"],
];

/* ================================
   BUILD TABLE
================================ */

function buildTable(tableId, data) {
  const table = document.getElementById(tableId);
  if (!table) return;

  const rows = data
    .map(
      (item, index) => `
    <tr class="live-row ${index === 0 ? "is-new" : ""}">
      <td class="live-user">${item[0]}</td>
      <td class="live-amount">${item[1]}</td>
      <td class="live-date">${item[2]}</td>
    </tr>
  `
    )
    .join("");

  /* duplicate rows for seamless infinite scroll */
  table.innerHTML = rows + rows;
}

/* ================================
   INIT
================================ */

document.addEventListener("DOMContentLoaded", () => {
  buildTable("liveDeposit", depositData);
  buildTable("liveWithdraw", withdrawData);
});
