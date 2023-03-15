let width_icon = `<svg width="15px" height="15px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M3.00014 2.73895C3.00014 2.94698 2.76087 3.06401 2.59666 2.93628L1.00386 1.69744C0.875177 1.59735 0.875177 1.40286 1.00386 1.30277L2.59666 0.063928C2.76087 -0.0637944 3.00014 0.0532293 3.00014 0.261266V1.00012H9.00009V0.261296C9.00009 0.0532591 9.23936 -0.0637646 9.40358 0.0639578L10.9964 1.3028C11.1251 1.40289 11.1251 1.59738 10.9964 1.69747L9.40358 2.93631C9.23936 3.06404 9.00009 2.94701 9.00009 2.73898V2.00012H3.00014V2.73895ZM9.50002 4.99998H2.50002C2.22388 4.99998 2.00002 5.22384 2.00002 5.49998V12.5C2.00002 12.7761 2.22388 13 2.50002 13H9.50002C9.77616 13 10 12.7761 10 12.5V5.49998C10 5.22384 9.77616 4.99998 9.50002 4.99998ZM2.50002 3.99998C1.67159 3.99998 1.00002 4.67156 1.00002 5.49998V12.5C1.00002 13.3284 1.67159 14 2.50002 14H9.50002C10.3284 14 11 13.3284 11 12.5V5.49998C11 4.67156 10.3284 3.99998 9.50002 3.99998H2.50002ZM14.7389 6.00001H14V12H14.7389C14.9469 12 15.064 12.2393 14.9362 12.4035L13.6974 13.9963C13.5973 14.125 13.4028 14.125 13.3027 13.9963L12.0639 12.4035C11.9362 12.2393 12.0532 12 12.2612 12H13V6.00001H12.2612C12.0532 6.00001 11.9361 5.76074 12.0639 5.59653L13.3027 4.00373C13.4028 3.87505 13.5973 3.87505 13.6974 4.00374L14.9362 5.59653C15.0639 5.76074 14.9469 6.00001 14.7389 6.00001Z"
    fill="currentColor"
  />
</svg>
`
var disabledPaginator = true
let search_icon = `<svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"> <path fill="#ff9678" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3 c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z"> <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="2s" from="0 50 50" to="360 50 50" repeatCount="indefinite"/> </path> <path fill="#ff9678" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7 c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z"> <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="-360 50 50" repeatCount="indefinite"/> </path> <path fill="#ff9678" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5 L82,35.7z"> <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="2s" from="0 50 50" to="360 50 50" repeatCount="indefinite"/> </path></svg>`

var bsl_page = 1
var bsl_results = []
var pathArray = window.location.pathname.split('/');
var sort= '';
if( pathArray[2] == 'new-plans'){
  sort = 'New Plans'
}
var sortby = sort !== "New Plans" ? "POPULARITY" : "NEWEST"


var url_params = {}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function on_change_page(page) {
  bsl_page = page
  // document.querySelector('#top-search').scrollIntoView({
  //   behavior: 'smooth'
  // });
  bsl_search_partial()
}

function update_search_results(data, filters) {
  console.log(data);
  if (bsl_page !== 1) {
    bsl_results = bsl_results.concat(data.results)
  } else {
    bsl_results = data.results
  }

  
  data.results = bsl_results
  
  first_load = false
  let results = "<div style='width:100%' class='product-dis-outerx' id='top-search'>";

  if (data.results.length == 0) {
    $("#searchresults").html("<h3>No plans were found matching your selection.</h1>")
  } else {

    $.each(data.results, function (key, value) {
      let plan_id = value.plan_id
      if (isNumeric(plan_id) && plan_id.length < 5) {
        plan_id = "0" + plan_id
      }

      results += "<a href='/products/" + value.handle + "'>"
      results += "<div class='search_resultX'><div class='search_result_inner'>"
      results += "<div class='card_image'>"
      results += "<div class='plan_id_search'>Plan ID " + plan_id + "</div>"
      results += "<img src='" + value.images[0] + "' class='img-fluid' >"
      if (value.floors) {
        results += `<div class="bed amti">
                                    <div class="bed amti-inner">
                                        <span class="bedroom_icon" ></span>
                                        <span class="bedroom-count">` + value.floors + `</span>
                                    </div>
                                    <span class="bedroom-title">Floor(s)</span>
                                </div>`
      }
      results += "</div>"
      results += '<h5>' + value.title + "</h5>"
      results += '<div class="amenitiesPro">'
      if (value.area) {
        results += `<div class="bed amti">
                                <div class="bed amti-inner">
                                    <span class="bedroom_icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 8V6C4 4.89543 4.89543 4 6 4H8" stroke="#FF8266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M4 16V18C4 19.1046 4.89543 20 6 20H8" stroke="#FF8266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M16 4H18C19.1046 4 20 4.89543 20 6V8" stroke="#FF8266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M16 20H18C19.1046 20 20 19.1046 20 18V16" stroke="#FF8266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <circle cx="12" cy="12" r="3" stroke="#FF8266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>                                        
                                    </span>
                                    <span class="bedroom-count">` + value.area + `</span>
                                </div>
                                <span class="bedroom-title">SQ FT</span>
                            </div>`
      }
      if (value.beds) {
        results += `<div class="bed amti">
                                <div class="bed amti-inner">
                                    <span class="bedroom_icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 7V18" stroke="#FF8266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M3 14H21" stroke="#FF8266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M21 18V10C21 8.89543 20.1046 8 19 8H11V14" stroke="#FF8266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <circle cx="7" cy="10" r="1" stroke="#FF8266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                    <span class="bedroom-count">` + value.beds + `</span>
                                </div>
                                <span class="bedroom-title">BEDS</span></div>`
      }
      if (value.baths) {
        results += `<div class="bed amti">
                                    <div class="bed amti-inner">
                                        <span class="bedroom_icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4 12H20C20.5523 12 21 12.4477 21 13V16C21 18.2091 19.2091 20 17 20H7C4.79086 20 3 18.2091 3 16V13C3 12.4477 3.44772 12 4 12Z" stroke="#FF8266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M6 12V5C6 3.89543 6.89543 3 8 3H11V5.25" stroke="#FF8266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M4 21L5 19.5" stroke="#FF8266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M20 21L19 19.5" stroke="#FF8266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </span>
                                        <span class="bedroom-count">` + value.baths + `</span>
                                    </div>
                                    <span class="bedroom-title">BATHS</span>
                                </div>`
      }
      if (value.width_str || value.depth_str) {
        results += `<div class="bed amti">
                                <div class="bed amti-inner">
                                    <span class="bedroom_icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 17L7 21L11 17" stroke="#FF8266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M7 21V10C7 8.34315 8.34315 7 10 7H21" stroke="#FF8266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M17 11L21 7L17 3" stroke="#FF8266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                    <span class="bedroom-count">` + value.width_str + `/` + value.depth_str + `</span>
                                </div>
                                <span class="bedroom-title">Width/Depth</span>
                            </div>`
      }
      results += '</div>'
      results += "</div></div></a>"
    })

    let sorter = `
		<select onChange="sortby=this.options[this.selectedIndex].value;bsl_search()" id="bsl_orderby">
      <option value="POPULARITY" ` + (sortby === "POPULARITY" ? "selected" : "") + `>Most popular</option>
			<option value="NEWEST" ` + (sortby === "NEWEST" ? "selected" : "") + `>Newest</option>
			<option value="LARGEST" ` + (sortby === "LARGEST" ? "selected" : "") + `>Large to small</option>
			<option value="SMALLEST" ` + (sortby === "SMALLEST" ? "selected" : "") + `>Small to large</option>
		</select>
	  `

    let pagination = "<div class='bsl_paginator' id='bsl_paginator' style='opacity:0;'>"
    let currentPage = bsl_page;
    let total_pages = data.n_pages;
    let classes = ""
    let vvv = 'current'


    if (total_pages <= 6) {
      for (i = 1; i <= total_pages; i++) {
        pagination += "<div  class='" + classes + "' onClick='on_change_page(" + i + ")'>" + i + "</div>"
      }
    } else {

    //   // Always print first page button
      pagination += "<div  class='" + classes + "' onClick='on_change_page(" + 1 + ")'>" + 1 + "</div>"


      // Print "..." only if currentPage is > 3
      if (currentPage > 5) {
        pagination += "<div>...</div>"

      }

      // special case where last page is selected...
      if (currentPage == total_pages) {
        let currentPageSecondLastNumber = (currentPage * 1) - 2;
        pagination += "<div  class='" + classes + "' onClick='on_change_page(" + currentPageSecondLastNumber + ")'>" +  currentPageSecondLastNumber  + "</div>"
      }

      // Print previous number button if currentPage > 2
      if (currentPage > 2) {
        let currentPagePreviousNumber = (currentPage * 1) - 1;
        pagination += "<div  class='" + classes + "' onClick='on_change_page(" + currentPagePreviousNumber + ")'>" + currentPagePreviousNumber + "</div>"

      }

      // //Print current page number button as long as it not the first or last page
      if (currentPage != 1 && currentPage != total_pages) {
        let innerNumcurrentPage = (currentPage * 1);
        pagination += "<div  class='" + vvv + "' onClick='on_change_page(" + innerNumcurrentPage + ")'>" + innerNumcurrentPage + "</div>"

      }

      // //print next number button if currentPage < lastPage - 1
      if (currentPage < total_pages - 1) {
        let secondPageAfterCurrentPage = currentPage + 1
        pagination += "<div  class='" + classes + "' onClick='on_change_page(" + secondPageAfterCurrentPage + ")'>" + secondPageAfterCurrentPage + "</div>"

      }

      // // special case where first page is selected...
      if (currentPage == 1) {
        let thirdPageAfterCurrentPage = currentPage + 2
        pagination += "<div  class='" + classes + "' onClick='on_change_page(" + thirdPageAfterCurrentPage + ")'>" + thirdPageAfterCurrentPage + "</div>"

      }

      // //print "..." if currentPage is < lastPage -2
      if (currentPage < total_pages - 2) {
        pagination += "<div>...</div>"
      }

      pagination += "<div  class='" + classes + "' onClick='on_change_page(" + total_pages + ")'>" + total_pages + "</div>"
    }


    results += "<div style=clear:both></div> </div>"


    pagination += "</div>"

    $("#searchresults").html(sorter + results + pagination)
    // setTimeout(function () {
    //   document.querySelector('#top-search').scrollIntoView({
    //     behavior: 'smooth'
    //   });
    // }, 250)
    setTimeout(function () {
              disabledPaginator = false
          }, 1000)
    
    var paginatorHandler = onVisibilityChange(document.getElementById("bsl_paginator"), function() {
        if(currentPage < total_pages && !disabledPaginator) {
          disabledPaginator = true
          on_change_page(currentPage+1)
          
        }
    });
  
    addOnShowListener(paginatorHandler)


  }

  let options = ""
  $.each(data.options, function (key, value) {
    if (Object.keys(value.values).length == 0) {
      return false;
    }
    if (collection && value.name == "collections") {
      return false
    }

    let checked_options = []



    if (value.name in filters)
      checked_options = filters[value.name].values


    let option = "<div>"
    option += "<strong>"
    option += capitalizeFirstLetter(value.name.replace("_", " "))
    option += "</strong>"
    option += "<div class='values' id='" + value.name + "'>"
    $.each(value.values, function (key, value) {
      if (key == "null") return false;
      option += "<div class='value'>"
      option += "<input type=checkbox data-key='" + key + "'"
      if (checked_options.includes(key)) {
        option += "checked"
      }
      option += "/>"
      option += "<label>"
      option += key
      let result_word = "Results"
      if (value === 1) {
        result_word = "Result"
      }
      option += " <i>["
      option += value
      option += " " + result_word + "]</i></label>"
      option += "</div>"
    })
    option += "</div>"
    option += "</div>"
    // options += option
    if (value.name == 'beds') {
      $("#beds").html(option)
    }

    if (value.name == 'master_bedroom') {
      $("#masterbeds").html(option)
    }

    if (value.name == 'floors') {
      $("#floor").html(option)
    }

    if (value.name == 'baths') {
      $("#baths").html(option)
    }

    if (value.name == 'half_baths') {
      $("#halfbaths").html(option)
    }
  })


  // $("#options").html(options)
}

function get_checked(field_name) {
  if (first_load) {
    return url_params[field_name]
  }

  let field = $("#" + field_name)
  let ids = []
  field.find("input[type=checkbox]").each(function (key, element) {
    if (element.checked) {
      ids.push(element.getAttribute("data-key"))
    }
  })
  return ids
}

var first_load = true

function bsl_search() {
  $("#searchresults").html(search_icon)
  bsl_page = 1;
  bsl_search_partial()
}

function bsl_search_partial() {
  let minarea = $("#minarea").val();
  let maxarea = $("#maxarea").val();

  let mingarage = $("#mingarage").val();
  let maxgarage = $("#maxgarage").val();

  let minwidth = $("#minwidth").val();
  let maxwidth = $("#maxwidth").val();

  let mindepth = $("#mindepth").val();
  let maxdepth = $("#maxdepth").val();

  let search_text = url_params.title || ""

  let filters = {
    beds: {
      values: get_checked("beds")
    },
    baths: {
      values: get_checked("baths")
    },
    collections: {
      values: (collection ? [collection] : get_checked("collections"))
    },
    half_baths: {
      values: get_checked("half_baths")
    },
    floors: {
      values: get_checked("floors")
    },

  }

  if (minarea || maxarea) {
    let area = {}
    if (minarea) area["min"] = minarea
    if (maxarea) area["max"] = maxarea
    filters["area"] = area
  }

  if (mingarage || maxgarage) {
    let garage = {}
    if (mingarage) garage["min"] = mingarage
    if (maxgarage) garage["max"] = maxgarage
    filters["garage_size"] = garage
  }

  if (minwidth || maxwidth) {
    let width = {}
    if (minwidth) width["min"] = minwidth
    if (maxwidth) width["max"] = maxwidth
    filters["width"] = width
  }

  if (mindepth || maxdepth) {
    let depth = {}
    if (mindepth) depth["min"] = mindepth
    if (maxdepth) depth["max"] = maxdepth
    filters["depth"] = depth
  }


  let search_json = {
    page: bsl_page,
    search_text: search_text,
    filters: filters,
    order_by: sortby
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(search_json)
  };
  fetch('https://scripts.garrellassociates.com/search/', requestOptions)
    .then(response => response.json())
    .then(data => update_search_results(data, filters));


}

function parse_url() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  url_params = {
    title: params.q || "",
    min_area: params.min_area || "",
    max_area: params.max_area || "",
    min_garage: params.min_garage || "",
    max_garage: params.max_garage || "",
    beds: (params.beds || "").split(",").filter(n => n),
    baths: (params.baths || "").split(",").filter(n => n),
    half_baths: (params.half_baths || "").split(",").filter(n => n),
    collections: (params.collections || "").split(",").filter(n => n),
    floors: (params.floors || "").split(",").filter(n => n),
  }
  $("#minarea").val(url_params.min_area);
  $("#maxarea").val(url_params.max_area);
  $("#mingarage").val(url_params.min_garage);
  $("#maxgarage").val(url_params.max_garage);
  // $("#searchbox").val(url_params.title);
}

// document.addEventListener('DOMContentLoaded', () => {
//   const sizeDropdownSpan = document.querySelector('#sizes_dropdown .size-span')
//   const floorDropdownSpan = document.querySelector('#floor_dropdown .floor-span')
//   const bedDropdownSpan = document.querySelector('#beds_dropdown .bed-span')
//   const bathDropdownSpan = document.querySelector('#baths_dropdown .bath-span')

//   const heatedMinArea = document.querySelector('#minarea')
//   const heatedMaxArea = document.querySelector('#maxarea')

//   const garageMinNo = document.querySelector('#mingarage')
//   const garageMaxNo = document.querySelector('#maxgarage')

//   const widthMin = document.querySelector('#minwidth')
//   const widthMax = document.querySelector('#maxwidth')

//   const depthMin = document.querySelector('#mindepth')
//   const depthMax = document.querySelector('#maxdepth')

//   const sizeApplyBtn = document.querySelector('#sizes_dropdown').nextElementSibling.querySelector('.apply_btn')
//   const floorApplyBtn = document.querySelector('#floor_dropdown').nextElementSibling.querySelector('.apply_btn')
//   const bedApplyBtn = document.querySelector('#beds_dropdown').nextElementSibling.querySelector('.apply_btn')
//   const bathApplyBtn = document.querySelector('#baths_dropdown').nextElementSibling.querySelector('.apply_btn')

//   const floorCheckboxes = document.querySelector('#floor_dropdown').nextElementSibling.querySelectorAll('input[type="checkbox"]')
//   const bedCheckboxes = document.querySelector('#beds_dropdown').nextElementSibling.querySelectorAll('input[type="checkbox"]')
//   const bathCheckboxes = document.querySelector('#baths_dropdown').nextElementSibling.querySelectorAll('input[type="checkbox"]')

//   let floorSelected = 0;
//   let bedSelected = 0;
//   let bathSelected = 0;

//   floorCheckboxes.forEach(e => {
//     e.addEventListener('change', function () {
//       if (this.checked == true) {
//         floorSelected++
//       } else {
//         floorSelected--
//       }
//     })
//   })
//   bedCheckboxes.forEach(e => {
//     e.addEventListener('change', function () {
//       if (this.checked == true) {
//         bedSelected++
//       } else {
//         bedSelected--
//       }
//     })
//   })
//   bathCheckboxes.forEach(e => {
//     e.addEventListener('change', function () {
//       if (this.checked == true) {
//         bathSelected++
//       } else {
//         bathSelected--
//       }
//     })
//   })
//   sizeApplyBtn.addEventListener('click', function () {
//     let sizesSelected = 0;

//     if (heatedMinArea.value && heatedMaxArea.value) {
//       sizesSelected++
//     }
//     if (garageMinNo.value && garageMaxNo.value) {
//       sizesSelected++
//     }
//     if (widthMin.value && widthMax.value) {
//       sizesSelected++
//     }
//     if (depthMin.value && depthMax.value) {
//       sizesSelected++
//     }
//     let sizeText = sizeDropdownSpan.textContent
//     sizeDropdownSpan.textContent = `Size ( ${sizesSelected} Selected )`
//   })
//   floorApplyBtn.addEventListener('click', function () {
//     floorDropdownSpan.textContent = `Floor (${floorSelected} Selected )`
//   })
//   bedApplyBtn.addEventListener('click', function () {
//     bedDropdownSpan.textContent = `Bed (${bedSelected} Selected )`
//   })
//   bathApplyBtn.addEventListener('click', function () {
//     bathDropdownSpan.textContent = `Bed (${bathSelected} Selected )`
//   })
// })

parse_url()
bsl_search()