let selectedRow = null;

document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const productCode = form.productCode.value;
    const productName = form.productName.value;
    const qty = form.qty.value;
    const price = form.price.value;

    if (selectedRow === null) {
        addProduct(productCode, productName, qty, price);
    } else {
        updateProduct(productCode, productName, qty, price);
    }

    form.reset();
    selectedRow = null;
    document.getElementById('submitButton').textContent = 'Submit';
});

function addProduct(productCode, productName, qty, price) {
    const tableBody = document.getElementById('productTableBody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${productCode}</td>
        <td>${productName}</td>
        <td>${qty}</td>
        <td>${price}</td>
        <td>
            <button class="edit-btn" onclick="editProduct(this)">Edit</button>
            <button class="delete-btn" onclick="deleteProduct(this)">Delete</button>
        </td>
    `;

    tableBody.appendChild(newRow);
}

function editProduct(button) {
    selectedRow = button.parentElement.parentElement;
    document.getElementById('productCode').value = selectedRow.cells[0].textContent;
    document.getElementById('productName').value = selectedRow.cells[1].textContent;
    document.getElementById('qty').value = selectedRow.cells[2].textContent;
    document.getElementById('price').value = selectedRow.cells[3].textContent;

    document.getElementById('submitButton').textContent = 'Update';
}

function updateProduct(productCode, productName, qty, price) {
    selectedRow.cells[0].textContent = productCode;
    selectedRow.cells[1].textContent = productName;
    selectedRow.cells[2].textContent = qty;
    selectedRow.cells[3].textContent = price;
}

function deleteProduct(button) {
    if (confirm("Do you want to delete this record?")) {
        const row = button.parentElement.parentElement;
        row.parentElement.removeChild(row);
        selectedRow = null;
    }
}
