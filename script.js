// Select form and table elements
const form = document.getElementById('crudForm');
const itemList = document.getElementById('itemList');

let currentItemId = null;  // To track the item being edited
let itemId = 0;  // Unique ID for each entry
let items = [];  // Array to store item data

// Function to handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent form from refreshing the page

    // Retrieve values from the form inputs
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const startdate = document.getElementById('startdate').value;
    const profilepic = document.getElementById('profilepic').files[0];  // Get the file input for profile pic

    // Validate that all fields are filled
    if (!name || !age || !email || !phone || !startdate || !profilepic) {
        alert("Please fill out all fields.");
        return;
    }

    // Create an object URL for the uploaded profile picture
    const profilePicUrl = URL.createObjectURL(profilepic);

    if (currentItemId === null) {
        // Add new item to the list
        itemId++;  // Increment item ID
        const item = {
            id: itemId,
            name,
            age,
            email,
            phone,
            startdate,
            profilepic: profilePicUrl  // Store profile picture URL
        };
        items.push(item);  // Add the new item to the list
    } else {
        // Update existing item in the list
        const item = items.find(i => i.id === currentItemId);
        item.name = name;
        item.age = age;
        item.email = email;
        item.phone = phone;
        item.startdate = startdate;
        item.profilepic = profilePicUrl;  // Update profile picture
        currentItemId = null;  // Reset currentItemId after updating
    }

    form.reset();  // Clear the form fields
    displayItems();  // Display updated items list
});

// Function to display all items in the table
function displayItems() {
    itemList.innerHTML = '';  // Clear the table

    items.forEach(item => {
        const row = document.createElement('tr');  // Create a new row for each item

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>${item.startdate}</td>
            <td><img src="${item.profilepic}" alt="Profile Pic" class="profile-pic" width="50" height="50"></td>
            <td class="actions">
                <button class="edit" onclick="editItem(${item.id})">Edit</button>
                <button class="delete" onclick="deleteItem(${item.id})">Delete</button>
            </td>
        `;
        itemList.appendChild(row);  // Add the row to the table
    });
}

// Function to edit an item
function editItem(id) {
    const item = items.find(i => i.id === id);  // Find the item by its ID

    // Populate the form fields with the item's data for editing
    document.getElementById('name').value = item.name;
    document.getElementById('age').value = item.age;
    document.getElementById('email').value = item.email;
    document.getElementById('phone').value = item.phone;
    document.getElementById('startdate').value = item.startdate;

    currentItemId = id;  // Set currentItemId to track the item being edited
}

// Function to delete an item
function deleteItem(id) {
    items = items.filter(i => i.id !== id);  // Filter out the item with the matching ID
    displayItems();  // Re-render the table with remaining items
}