let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


let mood = 'create';
let tmp;


// Get Total

function getTotal() {

    if (price.value !== '') {

        let result =
            (+price.value || 0) +
            (+taxes.value || 0) +
            (+ads.value || 0) -
            (+discount.value || 0);

        total.innerHTML = result;

        total.style.background = '#040';

    } else {

        total.innerHTML = '0';

        total.style.background = '#a00d02';
    }
}


// Get Data From Local Storage

let datapro;

if (localStorage.product != null) {

    datapro = JSON.parse(localStorage.product);

} else {

    datapro = [];
}


// Create Product

submit.onclick = function () {

    let newpro = {

        title: title.value.trim().toLowerCase(),

        price: price.value,

        taxes: taxes.value,

        ads: ads.value,

        discount: discount.value,

        total: total.innerHTML,

        count: count.value,

        category: category.value.trim().toLowerCase()
    };



    if (
        newpro.title !== '' &&
        newpro.price !== '' &&
        newpro.category !== ''
    ) {


        if (mood === 'create') {

            let productCount = Number(newpro.count);

            if (!productCount || productCount < 1) {

                productCount = 1;
            }

            if (productCount > 100) {

                alert('Count must be less than or equal to 100');

                return;
            }

            for (let i = 0; i < productCount; i++) {

                datapro.push({
                    ...newpro
                });

            }

        }

        else {

            datapro[tmp] = newpro;

            mood = 'create';

            submit.innerHTML = 'Create';

            count.style.display = 'block';
        }


        localStorage.setItem(
            'product',
            JSON.stringify(datapro)
        );


        clearData();

        showData();

    } else {

        alert('Please enter title, price and category');
    }
};


// Clear Inputs

function clearData() {

    title.value = '';

    price.value = '';

    taxes.value = '';

    ads.value = '';

    discount.value = '';

    total.innerHTML = '0';

    total.style.background = '#a00d02';

    count.value = '';

    category.value = '';
}


// Show Data

function showData() {

    getTotal();

    let table = '';

    for (let i = 0; i < datapro.length; i++) {

        table += `
            <tr>

                <td>${i + 1}</td>

                <td>${datapro[i].title}</td>

                <td>${datapro[i].price}</td>

                <td>${datapro[i].taxes}</td>

                <td>${datapro[i].ads}</td>

                <td>${datapro[i].discount}</td>

                <td>${datapro[i].total}</td>

                <td>${datapro[i].category}</td>

                <td>
                    <button
                        onclick="updateData(${i})"
                        class="update"
                    >
                        Update
                    </button>
                </td>

                <td>
                    <button
                        onclick="deleteData(${i})"
                        class="delete"
                    >
                        Delete
                    </button>
                </td>

            </tr>
        `;
    }


    document.getElementById('tbody').innerHTML = table;


    // Delete All Button

    let btnDeleteAll = document.getElementById('deleteAll');

    if (datapro.length > 0) {

        btnDeleteAll.innerHTML = `
            <button onclick="deleteAll()">
                Delete All (${datapro.length})
            </button>
        `;

    } else {

        btnDeleteAll.innerHTML = '';
    }
}


// Delete One Product

function deleteData(i) {

    datapro.splice(i, 1);

    localStorage.setItem(
        'product',
        JSON.stringify(datapro)
    );

    showData();
}



// Delete All Products

function deleteAll() {

    datapro = [];

    localStorage.removeItem('product');

    showData();
}


// Update Product

function updateData(i) {

    title.value = datapro[i].title;

    price.value = datapro[i].price;

    taxes.value = datapro[i].taxes;

    ads.value = datapro[i].ads;

    discount.value = datapro[i].discount;

    category.value = datapro[i].category;

    getTotal();

    count.style.display = 'none';

    submit.innerHTML = 'Update';

    mood = 'update';

    tmp = i;


    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


// Search Mood

let searchMood = 'title';



function getSearchMood(id) {

    let search = document.getElementById('search');


    if (id === 'searchTitle') {

        searchMood = 'title';

    } else {

        searchMood = 'category';
    }


    search.placeholder = 'Search By ' + searchMood;

    search.focus();

    search.value = '';

    showData();
}



// Search Data


function searchData(value) {

    let table = '';

    for (let i = 0; i < datapro.length; i++) {

        if (searchMood === 'title') {

            if (
                datapro[i].title
                    .includes(value.toLowerCase())
            ) {

                table += `
                    <tr>

                        <td>${i + 1}</td>

                        <td>${datapro[i].title}</td>

                        <td>${datapro[i].price}</td>

                        <td>${datapro[i].taxes}</td>

                        <td>${datapro[i].ads}</td>

                        <td>${datapro[i].discount}</td>

                        <td>${datapro[i].total}</td>

                        <td>${datapro[i].category}</td>

                        <td>
                            <button
                                onclick="updateData(${i})"
                                class="update"
                            >
                                Update
                            </button>
                        </td>

                        <td>
                            <button
                                onclick="deleteData(${i})"
                                class="delete"
                            >
                                Delete
                            </button>
                        </td>

                    </tr>
                `;
            }

        } else {

            if (
                datapro[i].category
                    .includes(value.toLowerCase())
            ) {

                table += `
                    <tr>

                        <td>${i + 1}</td>

                        <td>${datapro[i].title}</td>

                        <td>${datapro[i].price}</td>

                        <td>${datapro[i].taxes}</td>

                        <td>${datapro[i].ads}</td>

                        <td>${datapro[i].discount}</td>

                        <td>${datapro[i].total}</td>

                        <td>${datapro[i].category}</td>

                        <td>
                            <button
                                onclick="updateData(${i})"
                                class="update"
                            >
                                Update
                            </button>
                        </td>

                        <td>
                            <button
                                onclick="deleteData(${i})"
                                class="delete"
                            >
                                Delete
                            </button>
                        </td>

                    </tr>
                `;
            }
        }
    }


    document.getElementById('tbody').innerHTML = table;
}
showData();