const checkboxid = document.getElementsByClassName('dropdown2');

let htmlString = "";






for(let i = 1; i<11; i++){
    htmlString += `<div class="pt-[16px]">
    <button
      class="flex items-center active::bg-green-600"
      onclick="checkf(${i+3})"
    >
      <div class="w-[14px] h-[14px] border-[1px] rounded-[2px]">
        <span
          id=""
          class="h-full w-full items-center check${i+3}"
          style="display: none"
          >&check;</span
        >
      </div>
      &nbsp;&nbsp;&nbsp;
      <div>Family of ${i}</div>
    </button>
  </div>`
}

checkboxid[0].innerHTML = htmlString;
checkboxid[1].innerHTML = htmlString;

