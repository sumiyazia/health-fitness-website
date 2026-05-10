/* ============================================================
   BMI Calculator
   ============================================================ */

(function () {
  const unitToggle = document.querySelectorAll('.unit-btn');
  const heightInput = document.getElementById('heightInput');
  const weightInput = document.getElementById('weightInput');
  const heightUnit = document.getElementById('heightUnit');
  const weightUnit = document.getElementById('weightUnit');
  const bmiBtn = document.getElementById('calculateBmi');
  const resultBox = document.querySelector('.bmi-result-box');
  const bmiValue = document.getElementById('bmiValue');
  const bmiCategory = document.getElementById('bmiCategory');
  const bmiScale = document.querySelector('.bmi-scale');

  if (!unitToggle.length || !heightInput || !weightInput) return;

  let currentUnit = 'metric';

  unitToggle.forEach(btn => {
    btn.addEventListener('click', () => {
      unitToggle.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentUnit = btn.getAttribute('data-unit');

      if (currentUnit === 'metric') {
        heightUnit.textContent = 'cm';
        weightUnit.textContent = 'kg';
        heightInput.placeholder = 'e.g., 170';
        weightInput.placeholder = 'e.g., 70';
      } else {
        heightUnit.textContent = 'in';
        weightUnit.textContent = 'lbs';
        heightInput.placeholder = 'e.g., 67';
        weightInput.placeholder = 'e.g., 154';
      }

      // Reset result
      if (resultBox) resultBox.classList.remove('show');
      heightInput.value = '';
      weightInput.value = '';
    });
  });

  function calculateBMI() {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (!height || !weight || height <= 0 || weight <= 0) {
      alert('Please enter valid height and weight values.');
      return;
    }

    let bmi;
    if (currentUnit === 'metric') {
      bmi = weight / ((height / 100) ** 2);
    } else {
      bmi = (weight / (height ** 2)) * 703;
    }

    bmi = bmi.toFixed(1);

    let category = '';
    let categoryColor = '';
    if (bmi < 18.5) {
      category = 'Underweight';
      categoryColor = '#93C5FD';
      setScalePosition(10);
    } else if (bmi < 25) {
      category = 'Normal Weight';
      categoryColor = '#84CC16';
      setScalePosition(40);
    } else if (bmi < 30) {
      category = 'Overweight';
      categoryColor = '#FCD34D';
      setScalePosition(70);
    } else {
      category = 'Obese';
      categoryColor = '#FCA5A5';
      setScalePosition(90);
    }

    bmiValue.textContent = bmi;
    bmiCategory.textContent = category;
    bmiCategory.style.color = categoryColor;
    resultBox.classList.add('show');
  }

  function setScalePosition(percent) {
    if (!bmiScale) return;
    const indicator = document.querySelector('.bmi-scale-indicator');
    if (indicator) {
      indicator.style.left = percent + '%';
    }
  }

  if (bmiBtn) {
    bmiBtn.addEventListener('click', calculateBMI);
    heightInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') calculateBMI();
    });
    weightInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') calculateBMI();
    });
  }
})();
