const selection = document.getElementsByClassName('familypackage');

let familypackages = "";



for(let i = 1; i<12; i++){

    familypackages += `<div><div class="relative">
    <div
      class="rounded-[7.4px] sm:rounded-[9.6px] md:rounded-[12px] rounded-b-none sm:rounded-b-none md:rounded-b-none border-b-0 border-[1px] pb-[14px] md:pb-[17.57px] lg:pb-[24px]"
    >
      <img
        src="../../public/Images/familypackages/${i}.png"
        class="lg:pt-[13.74px] md:pt-[11.71px] pt-[9px] h-auto rounded-lg mx-auto px-[9px] md:px-[11.71px] lg:px-[13.74px]"
      />
  
      <div
        class="pl-[9px] md:pl-[11.71px] lg:pl-[13.74px] pt-[9px] md:pt-[11px] lg:pt-[17px]"
      >
        <p class="font-medium text-xs md:text-base lg:text-lg">
          Silver (For 10 people, Veg Pack)
        </p>
  
        <p class="font-normal text-[10px] md:text-sm lg:text-xs text-[#32AA00]">
          Rs.<span
            class="font-bold text-xs md:text-base lg:text-lg text-[#32AA00]"
            >100</span
          >
        </p>
      </div>
    </div>
    <button
      class="w-full bg-gradient-to-r from-[#3baf3d] to-[#5DC234] rounded-b-[7.4px] ml-0 sm:rounded-b-[9.6px] md:rounded-b-[12px] font-medium text-[10px] sm:text-sm text-white flex flex-row justify-center h-[29px] md:h-[39px] lg:h-[47px] my-auto py-auto items-center"
    >
      <img
        src="../public/Images/cart2.svg"
        class="h-[14px] md:h-[19.26px] lg:h-[24px]"
      />
      &nbsp;&nbsp;
      <div class="my-auto text-white">Select Option</div>
    </button>
  </div>
  </div>
  `

}

selection[0].innerHTML = familypackages;

