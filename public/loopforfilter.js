const checkboxid = document.getElementById('dropdown2');

let htmlString = "";






for(let i = 1; i<11; i++){
    htmlString += `<div class="pt-[16px]">
    <button
      class="flex items-center active::bg-green-600"
      onclick="checkf(${i+3})"
    >
      <div class="w-[14px] h-[14px] border-[1px] rounded-[2px]">
        <span
          id="check${i+3}"
          class="h-full w-full items-center"
          style="display: none"
          >&check;</span
        >
      </div>
      &nbsp;&nbsp;
      <div>Family of ${i}</div>
    </button>
  </div>`
}

checkboxid.innerHTML = htmlString;
