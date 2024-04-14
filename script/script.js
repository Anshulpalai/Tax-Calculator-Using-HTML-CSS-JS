// script.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('taxForm');
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementsByClassName('close')[0];

  const hoverElement1 = document.querySelector('.hover-element1');
  const hoverElement2 = document.querySelector('.hover-element2');
  const hoverElement3 = document.querySelector('.hover-element3');
  const tooltip1 = document.querySelector('.tooltip-ga');
  const tooltip2 = document.querySelector('.tooltip-ei');
  const tooltip3 = document.querySelector('.tooltip-de');

  hoverElement1.addEventListener('mouseover', function () {
    tooltip1.style.display = 'block';
    tooltip1.textContent = 'Gross annual income is your total salary in a year before any deductions';
  });

  hoverElement2.addEventListener('mouseover', function () {
    tooltip2.style.display = 'block';
    tooltip2.textContent = 'Gross annual income is your total salary in a year before any deductions';
  });

  hoverElement3.addEventListener('mouseover', function () {
    tooltip3.style.display = 'block';
    tooltip3.textContent = 'Gross annual income is your total salary in a year before any deductions';
  });

  hoverElement1.addEventListener('mouseout', function () {
    tooltip1.style.display = 'none';
  });
  hoverElement2.addEventListener('mouseout', function () {
    tooltip2.style.display = 'none';
  });
  hoverElement3.addEventListener('mouseout', function () {
    tooltip3.style.display = 'none';
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateForm()) {
      calculateTax();
      modal.style.display = 'block';
    }
  });

  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  function validateForm() {
    const grossIncome = document.getElementById('grossIncome').value;
    const extraIncome = document.getElementById('extraIncome').value;
    const deductions = document.getElementById('deductions').value;
    const age = document.getElementById('age').value;

    const grossIncomeError = document.getElementById('grossIncomeError');
    const extraIncomeError = document.getElementById('extraIncomeError');
    const deductionsError = document.getElementById('deductionsError');
    const ageError = document.getElementById('ageError');

    let isValid = true;

    // Validate gross income
    if (isNaN(grossIncome) || grossIncome === '') {
      grossIncomeError.style.display = 'inline';
      isValid = false;
    } else {
      grossIncomeError.style.display = 'none';
    }

    // Validate extra income
    if (isNaN(extraIncome) || extraIncome === '') {
      extraIncomeError.style.display = 'inline';
      isValid = false;
    } else {
      extraIncomeError.style.display = 'none';
    }

    // Validate deductions
    if (isNaN(deductions) || deductions === '') {
      deductionsError.style.display = 'inline';
      isValid = false;
    } else {
      deductionsError.style.display = 'none';
    }

    // Validate age
    if (age === '') {
      ageError.style.display = 'inline';
      isValid = false;
    } else {
      ageError.style.display = 'none';
    }

    return isValid;
  }

  function calculateTax() {
    const grossIncome = parseFloat(document.getElementById('grossIncome').value);
    const extraIncome = parseFloat(document.getElementById('extraIncome').value);
    const deductions = parseFloat(document.getElementById('deductions').value);
    const age = document.getElementById('age').value;

    let taxRate = 0;
    if (age === '<40') {
      taxRate = 0.3;
    } else if (age === '≥40&<60') {
      taxRate = 0.4;
    } else {
      taxRate = 0.1;
    }

    const taxableIncome = grossIncome + extraIncome - deductions - 8;

    let taxAmount = 0;
    if (taxableIncome > 0) {
      taxAmount = taxRate * taxableIncome;
    }

    const taxResult = document.getElementById('taxResult');
    taxResult.textContent = `Tax amount: ${taxAmount.toFixed(2)} Lakhs`;
  }
});
