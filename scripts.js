/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "230px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}



function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}




const fileInput = document.getElementById('item-image');
const previewImg = document.getElementById('preview-img');

fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];  // Get the uploaded file
    
    if (file) {
        const reader = new FileReader();  // Create file reader
        
        reader.onload = function(e) {
            previewImg.src = e.target.result;  // Set image source
            previewImg.style.display = 'block';  // Show image
        };
        
        reader.readAsDataURL(file);  // Read file as data URL
    }
});










// Sample data
const inventoryData = [
    {
        id: 1,
        itemName: 'Blue Backpack',
        category: 'Bags',
        location: 'Library',
        dateFound: '2024-12-08',
        timeFound: '10:30 AM',
        status: 'Pending',
        description: 'A medium-sized blue backpack with black straps. Has a small tear on the front pocket.',
        finderName: 'Sarah Johnson',
        finderEmail: 'sarah.j@email.com',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'
    },
    {
        id: 2,
        itemName: 'iPhone 13',
        category: 'Electronics',
        location: 'Cafeteria',
        dateFound: '2024-12-09',
        timeFound: '2:15 PM',
        status: 'Pending',
        description: 'Black iPhone 13 with a clear protective case. Has a small crack on the bottom right corner.',
        finderName: 'Mike Chen',
        finderEmail: 'mike.chen@email.com',
        image: 'https://images.unsplash.com/photo-1592286927505-4a097c08e604?w=400'
    }
];

const claimsData = [
    {
        id: 1,
        itemName: 'Blue Backpack',
        category: 'Bags',
        claimer: 'John Doe',
        contact: '09123456789',
        status: 'Pending'
    }
];

// Icon SVGs
const icons = {
    view: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>`,
    edit: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
    delete: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`
};

// Create status dropdown
function createStatusSelect(currentStatus, type, id) {
    const select = document.createElement('select');
    select.value = currentStatus;
    
    const options = ['Pending', 'Claimed', 'Returned', 'Archived'];
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        if (opt === currentStatus) option.selected = true;
        select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
        handleStatusChange(type, id, e.target.value);
    });

    return select;
}

// Create action buttons
function createActionButtons(type, id) {
    const container = document.createElement('div');
    container.className = 'actions';

    if (type === 'inventory') {
        // View button
        const viewBtn = document.createElement('button');
        viewBtn.className = 'icon-btn view-btn';
        viewBtn.innerHTML = icons.view;
        viewBtn.onclick = () => handleView(id);
        container.appendChild(viewBtn);

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'icon-btn edit-btn';
        editBtn.innerHTML = icons.edit;
        editBtn.onclick = () => handleEdit(id);
        container.appendChild(editBtn);
    }

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'icon-btn delete-btn';
    deleteBtn.innerHTML = icons.delete;
    deleteBtn.onclick = () => handleDelete(type, id);
    container.appendChild(deleteBtn);

    return container;
}

// Render inventory table
function renderInventory() {
    const tbody = document.getElementById('inventory-body');
    tbody.innerHTML = '';

    inventoryData.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.itemName}</td>
            <td>${item.category}</td>
            <td>${item.location}</td>
            <td>${item.dateFound}</td>
        `;

        const statusTd = document.createElement('td');
        statusTd.appendChild(createStatusSelect(item.status, 'inventory', item.id));
        row.appendChild(statusTd);

        const actionsTd = document.createElement('td');
        actionsTd.appendChild(createActionButtons('inventory', item.id));
        row.appendChild(actionsTd);

        tbody.appendChild(row);
    });
}

// Render claims table
function renderClaims() {
    const tbody = document.getElementById('claims-body');
    tbody.innerHTML = '';

    claimsData.forEach(claim => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${claim.itemName}</td>
            <td>${claim.category}</td>
            <td>${claim.claimer}</td>
            <td>${claim.contact}</td>
        `;

        const statusTd = document.createElement('td');
        statusTd.appendChild(createStatusSelect(claim.status, 'claims', claim.id));
        row.appendChild(statusTd);

        const actionsTd = document.createElement('td');
        actionsTd.appendChild(createActionButtons('claims', claim.id));
        row.appendChild(actionsTd);

        tbody.appendChild(row);
    });
}

// Event handlers
let currentViewItemId = null;

function openModal(item) {
    const modal = document.getElementById('view-modal');
    const modalBody = document.getElementById('modal-body');
    currentViewItemId = item.id;

    // Create modal content
    modalBody.innerHTML = `
        <div class="item-image ${item.image ? '' : 'no-image'}">
            ${item.image ? `<img src="${item.image}" alt="${item.itemName}">` : 'No image available'}
        </div>
        <div class="detail-grid">
            <div class="detail-item">
                <span class="detail-label">Item Name</span>
                <span class="detail-value">${item.itemName}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Category</span>
                <span class="detail-value">${item.category}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Location Found</span>
                <span class="detail-value">${item.location}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Date Found</span>
                <span class="detail-value">${item.dateFound}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Time Found</span>
                <span class="detail-value">${item.timeFound || 'N/A'}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Status</span>
                <span class="detail-value">
                    <span class="status-badge ${item.status.toLowerCase()}">${item.status}</span>
                </span>
            </div>
            ${item.description ? `
            <div class="detail-item">
                <span class="detail-label">Description</span>
                <span class="detail-value">${item.description}</span>
            </div>
            ` : ''}
            ${item.finderName ? `
            <div class="detail-item">
                <span class="detail-label">Reported By</span>
                <span class="detail-value">${item.finderName}</span>
            </div>
            ` : ''}
            ${item.finderEmail ? `
            <div class="detail-item">
                <span class="detail-label">Contact Email</span>
                <span class="detail-value">${item.finderEmail}</span>
            </div>
            ` : ''}
        </div>
    `;

    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('view-modal');
    modal.classList.remove('active');
    currentViewItemId = null;
}

function handleEditFromModal() {
    closeModal();
    if (currentViewItemId) {
        handleEdit(currentViewItemId);
    }
}

// Close modal when clicking outside
document.getElementById('view-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

function handleStatusChange(type, id, newStatus) {
    console.log(`Changed ${type} item ${id} status to ${newStatus}`);
    // Update your data here
    if (type === 'inventory') {
        const item = inventoryData.find(i => i.id === id);
        if (item) item.status = newStatus;
    } else {
        const claim = claimsData.find(c => c.id === id);
        if (claim) claim.status = newStatus;
    }
}

function handleView(id) {
    const item = inventoryData.find(i => i.id === id);
    if (item) {
        openModal(item);
    }
}

function handleEdit(id) {
    console.log('Edit item:', id);
    alert(`Editing item ${id}`);
}

function handleDelete(type, id) {
    if (confirm('Are you sure you want to delete this item?')) {
        console.log('Delete:', type, id);
        
        if (type === 'inventory') {
            const index = inventoryData.findIndex(i => i.id === id);
            if (index > -1) {
                inventoryData.splice(index, 1);
                renderInventory();
            }
        } else {
            const index = claimsData.findIndex(c => c.id === id);
            if (index > -1) {
                claimsData.splice(index, 1);
                renderClaims();
            }
        }
    }
}

// Initial render
renderInventory();
renderClaims();