const PhonLoader = async (searchText) => {
    const revs = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await revs.json();
    const phones = data.data; 
    phoneDisplay(phones);
}


const phoneDisplay = (pramitar) => {
    const containerField = document.getElementById('container-field');
    containerField.innerHTML = '';
    pramitar.forEach(phone => {
        const divCard = document.createElement('div');
        divCard.classList = `card card-compact bg-base-100 shadow-lg border border-slate-400 p-5 `;
        divCard.innerHTML = `
            <figure>
                    <img
                    src="${phone.image}"
                    alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h1 class="card-title ">${phone.phone_name}</h1>
                    <h3>${phone.slug}</h3>
                    <p>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <div class="card-actions justify-center">
                    <button class="btn btn-primary">Show Details</button>
                    </div>
                </div>
        `;
        containerField.appendChild(divCard);
    });
}


const handelerSearch = () => {
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    PhonLoader(searchText);
}


