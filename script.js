 document.addEventListener('DOMContentLoaded', function() {

let currentPage = 1;
const itemsPerPage = 6;
async function renderData() {
    const apiUrl = 'https://api.pw.wintpay.com/api/v1/store/get-products-by-store/12';

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();
        const { data } = products;

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = data.slice(start, end);

        const productGrid = document.getElementById('productGrid');
       
  
        setTimeout(() => {
            productGrid.innerHTML = '';

            pageData.forEach(product => {
                const card = document.createElement('div');
                card.className = 'border rounded-lg overflow-hidden group';

                card.innerHTML = `
        <div class="relative">
          <img src="${product.image}?height=300&width=300" alt="${product.product_name}" class="w-full h-64 object-cover">
          <div class="absolute inset-0 bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <button class="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
        <div class="p-4">
          <button class="w-full py-2 border border-gray-300 rounded mb-4 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Move to Cart
          </button>
          <h3 class="font-bold">${product.product_name}</h3>
          <p class="text-sm text-gray-600">${product.description.slice(0, 200)}...</p>
          <div class="flex items-center mt-2">
            <span class="font-bold">$${product.price.toFixed(2)}</span>
            <span class="text-gray-400 line-through ml-2">$${product.price.toFixed(2)}</span>
          </div>
        </div>
      `;
                // Append the card to the grid
                productGrid.appendChild(card);
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500);
        return data
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}
const paginationContainer = document.getElementById('pagination');

function renderPagination(data) {
    paginationContainer.innerHTML = '';

    // Calculate the total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = `py-2 px-4 rounded ${i === currentPage
            ? 'bg-black text-white'
            : 'bg-gray-200 hover:bg-gray-300'
            }`;
        button.addEventListener('click', () => {
            currentPage = i;
            updatePagination();
        });

        paginationContainer.appendChild(button);
    }


}

async function updatePagination() {
    const data = await renderData();
    renderPagination(data);
}
updatePagination();


const menuItems = [
    { icon: "fa-regular fa-user", text: "Personal Information", link: "#" },
    { icon: "fa-solid fa-box", text: "My Orders", link: "#" },
    { icon: "fa-solid fa-heart", text: "My Wishlists", link: "#", active: true },
    { icon: "fa-solid fa-location-dot", text: "Manage Addresses", link: "#" },
    { icon: "fa-regular fa-credit-card", text: "Saved Cards", link: "#" },
    { icon: "fa-regular fa-bell", text: "Notifications", link: "#" },
    { icon: "fa-solid fa-gear", text: "Settings", link: "#" },
];

const listContainer = document.getElementById('list');

menuItems.forEach(item => {
    const anchor = document.createElement('a');
    anchor.href = item.link;
    anchor.className = `flex items-center p-3 rounded ${item.active ? 'bg-black text-white' : 'hover:bg-gray-100'
        }`;

    anchor.innerHTML = `
    <i class="${item.icon} w-6"></i>
    <span>${item.text}</span>
  `;

    listContainer.appendChild(anchor);
});


    const paymentMethods = [
      {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjT1k-UiypgI080po56u-2w9BIle0rngmvA&s?height=30&width=40",
        alt: "Visa"
      },
      {
        src: "https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/13674554/Mastercard_logo.jpg?quality=90&strip=all&crop=0,16.666666666667,100,66.666666666667?height=30&width=40",
        alt: "Mastercard"
      },
      {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPtiox0pzI-mDFVFtObDijoFgng0o56QbB4A&s?height=30&width=40",
        alt: "Google Pay"
      },
      {
        src: "https://i0.wp.com/www.dafontfree.io/wp-content/uploads/2023/11/amex-logo.png?resize=2000%2C1311&ssl=1?height=30&width=40",
        alt: "American Express"
      },
      {
        src: "https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_640.png?height=30&width=40",
        alt: "PayPal"
      }
    ];

    const container = document.getElementById('paymentIcons');
    
    paymentMethods.forEach(payment => {
      const img = document.createElement('img');
      img.src = payment.src;
      img.alt = payment.alt;
      img.className = 'h-8';
      container.appendChild(img);
    });
  });