// DOM Elements
const passwordOutput = document.getElementById('passwordOutput');
const copyButton = document.getElementById('copyButton');
const lengthSlider = document.getElementById('passwordLength');
const lengthValue = document.getElementById('lengthValue');
const generateButton = document.getElementById('generateButton');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const toggleVisibilityBtn = document.getElementById('toggleVisibility');

// Character Sets
const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*';

// Toggle password visibility
toggleVisibilityBtn.addEventListener('click', () => {
    const type = passwordOutput.type === 'password' ? 'text' : 'password';
    passwordOutput.type = type;
    toggleVisibilityBtn.classList.toggle('show-password');
    toggleVisibilityBtn.setAttribute('aria-label', 
        type === 'password' ? '显示密码' : '隐藏密码'
    );
});

// Update length value display
lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

// Generate password function
function generatePassword() {
    let chars = '';
    let password = '';
    
    // Add selected character sets
    if (uppercaseCheckbox.checked) chars += UPPERCASE_CHARS;
    if (lowercaseCheckbox.checked) chars += LOWERCASE_CHARS;
    if (numbersCheckbox.checked) chars += NUMBER_CHARS;
    if (symbolsCheckbox.checked) chars += SYMBOL_CHARS;
    
    // Validate at least one character set is selected
    if (chars === '') {
        alert('请至少选择一种字符类型！');
        return;
    }
    
    // Generate password
    const length = parseInt(lengthSlider.value);
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    
    // Ensure password contains at least one character from each selected set
    if (uppercaseCheckbox.checked && !/[A-Z]/.test(password)) return generatePassword();
    if (lowercaseCheckbox.checked && !/[a-z]/.test(password)) return generatePassword();
    if (numbersCheckbox.checked && !/[0-9]/.test(password)) return generatePassword();
    if (symbolsCheckbox.checked && !/[!@#$%^&*]/.test(password)) return generatePassword();
    
    passwordOutput.value = password;
}

// Copy password to clipboard
copyButton.addEventListener('click', async () => {
    if (!passwordOutput.value) {
        alert('请先生成密码！');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(passwordOutput.value);
        const originalText = copyButton.textContent;
        copyButton.textContent = '已复制！';
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 2000);
    } catch (err) {
        alert('复制失败，请手动复制。');
    }
});

// Generate password on button click
generateButton.addEventListener('click', generatePassword);

// Generate initial password
generatePassword(); 