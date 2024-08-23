const PhonLoader = async (searchText, isShowAll) => {
    const revs = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await revs.json();
    const phones = data.data; 
    phoneDisplay(phones, isShowAll);
}

const phoneDisplay = (pramitar, isShowAll) => {
    const containerField = document.getElementById('container-field');

    // container field clear
    containerField.innerHTML = '';

    // show all button display
    const showContainer = document.getElementById('showField');
    if(pramitar.length > 12 && !isShowAll){
        showContainer.classList.remove('hidden');
    }
    else{
        showContainer.classList.add('hidden');
    }

    // display 12 items
    if(!isShowAll){
        pramitar = pramitar.slice(0, 12);
    }

    // All data theke 1 ta kre paoyar jnno 
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
                    <h1 class="card-title text-2xl ">${phone.phone_name}</h1>
                    <h3 class="text-lg">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</h3>
                    <div class="card-actions justify-center">
                    <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary my-3">Show Details</button>
                    </div>
                </div>
        `;
        containerField.appendChild(divCard);
    });

    loadingHandelerSpiner(false);
}

// loading handeler
const loadingHandelerSpiner = (isloading) => {
    const spinerContainer = document.getElementById('loading-container');
    if(isloading){
        spinerContainer.classList.remove('hidden');
    }
    else{
        spinerContainer.classList.add('hidden');
    }
}

// search field and search button cunnection
const handelerSearch = (isShowAll) => {
    loadingHandelerSpiner(true);
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    PhonLoader(searchText, isShowAll);
}

// show Dwtails button
const handleShowDetail = async (id) => {
    // console.log('click', id);
    const revs = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await revs.json();
    const phoneData = data.data;
    console.log(phoneData);
    showPhoneDetails(phoneData);
}

// phone Details Display
 const showPhoneDetails = (phoneData) => {
    const sowDetailContaine = document.getElementById('show-details-container');
    sowDetailContaine.innerHTML = `
    <img class="mx-auto p-5" src="${phoneData.image}" alt="">
      <h1 class="font-bold my-3 text-2xl">${phoneData.name} </h1>
      <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
      <h1 class="text-sm mt-3"> <span class="text-lg font-medium">Brand : </span>${phoneData.brand}</h1>  
      <h1 class="text-sm"> <span class="text-lg font-medium">Storage : </span>${phoneData.mainFeatures.storage}</h1>  
      <h2 class="text-sm"> <span class="text-lg font-medium">ChipSet : </span>${phoneData.mainFeatures.chipSet}</h2>  
      <h3 class="text-sm"> <span class="text-lg font-medium">Display Size : </span>${phoneData.mainFeatures.displaySize}</h3>  
      <h3 class="text-sm"> <span class="text-lg font-medium">GPS : </span>${phoneData.others.GPS}</h3>        
      <h2 class="text-sm"> <span class="text-lg font-medium">Release Date : </span>${phoneData.releaseDate}</h2>  
    `;



     my_modal_3.showModal();
 }


const handleShowAll = () =>{
    handelerSearch(true);
}
