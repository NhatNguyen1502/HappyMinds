
document.getElementById('categoryFood').addEventListener('click', () => {
    let select = document.getElementById('categorySelection');
    select.size = (select.size === 1) ? select.options.length : 1;
    select.focus();
})