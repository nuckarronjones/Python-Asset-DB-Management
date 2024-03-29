let columnLength = $('th').length//get length of columns. Example, 16 columns exist right now

$( document ).ready(function() {

//testing
//let x = sqlTableResults.replace(/&#39;/g,"\"")

//console.log(x)

//////LOADING SCREEN//////
$('#loadingContainer').css('display','none')//goes away once document loads

//////POST REQUESTS //////
$('#sudoForm').on('submit',(e)=>{//Change table item post req
	e.preventDefault();

	$.ajax({
		data:{
			value: queriesToBeExcecuted,
			thisid: thisid,
			column: thiscolumn
		},

		type: 'POST',
		url: '/edit'
	}).done(()=>{
		console.log(queriesToBeExcecuted + '\n' + thisid + "\n" + thiscolumn)
	})
})

$('#sudoFormDropDown').on('submit',(e)=>{//dropdown branch filter  post req
	e.preventDefault();

	$.ajax({
		data:{
			branchname: branch,
		},
		type: 'POST',
		url: '/home',
	}).done(()=>{
		location.reload(true);
	})

})

$('#delRow').on('click',(e)=>{//delete row button. Must have highlighted row active
	e.preventDefault();

	let idnumber = $('.highlight').attr('id')

	if(idnumber === undefined){//this means that no row is highlighted
		alert("Please highlight a row you wish to delete, then click the delete button")
	}else{
		$.ajax({
			data:{
				idnum: idnumber
			},
			type: 'POST',
			url: '/deleteRow',
		}).done(()=>{
		location.reload(true);
	})
	$('.highlight').fadeOut('slow')
	}

})






//////TOP PORTION FUNCTIONALITY//////

/*$("#searchbox").on("keypress", function(e){//searchbar row filtering

	if((!$(this).is('[readonly]') && e.which == 13)){//13 = enter key

		let searchVal = $(this).val().toUpperCase()//word typed in search bar

		if (searchVal === ''){//if the search is empty, just reload table
			location.reload(true)
		}

		let count = 1//the count keeps track of how many columns exist, and when a new row is being analyzed

		let matchedWord = false

		$('#mainTable tr td').each((i,row)=>{
			//row = each td
			//td child consists of the 'input' with the value to be compared against
			//$(row).children().val() = actual value to be compared
			//$(row).parent() = actual table row

			let dataEntry = $(row).children().val().toUpperCase()

			if(dataEntry.indexOf(searchVal) != -1){//locate if dataEntry exists in searchval
				matchedWord = true//a match was found
			}

			count++

			if(count > columnLength){//16
				if (matchedWord == false){//no matches were found in the row
					$(row).parent().fadeOut('slow')//hide parent if no previous matches were found
				}
				count = 1//reset count
				matchedWord = false//reset value
			}


		})

	}
})*/

console.log(allTable)

$("#searchbox").on("keypress", function(e){//searchbar row filtering

	if((!$(this).is('[readonly]') && e.which == 13)){//13 = enter key

		let searchVal = $(this).val().toUpperCase()//word typed in search bar

		if (searchVal === ''){//if the search is empty, just reload table
			location.reload(true)

		}else{

			$("tbody").empty();

			for(i=0;i< allTable.length; i++){
				let rowEntry = `<tr id='${allTable[i][0]}'>`
				if(allTable[i].join().indexOf(searchVal) != -1){//join that array to search indexof


					console.log(allTable[i])//DEBUG
         			console.log("\n" + allTable[i].join() + "\n")//DEBUG
         			console.log("\t" + allTable[i].join().indexOf("CDM") + " INDEX")//DEBUG

         			for(j=0;j<allTable[i].length;j++){
         				rowEntry += `<td id='column' class='tableItem'><input class='tdItem tdInput' value='${allTable[i][j]}' readonly></td>`
         			}


				}

				$("tbody").append(rowEntry + "</tr>")
			}
		}
	}
})


$("#branches").change(()=>{//branch dropdown menu
	branch = $("#branches option:selected").val();
	$('form#sudoFormDropDown').submit();
})


//button to edit table contents
let active = false;//true =  edit, false = no edit
$('#changeTd').click((e)=>{

	e.preventDefault();

	if(active == false){//currenly unable to edit, toggle edit
		$(".tdItem").removeAttr('readonly');
		active = true;
	}
	else{//able to edit, toggle no edit
		$(".tdItem").attr('readonly',true);
		console.log(e.target);
		active = false;
	}


})


//////TABLE FUNCTIONALITY//////

    $('#mainTable').on('click',(e)=>{//Highlight table row when selected
    	selected = $(e.target);
    	$('tr').removeClass('highlight');//before adding class, remove all existing highlights
    	selected.closest("tr").addClass('highlight');
    })


    $(".tableItem").on("keypress", "input", function(e){

        if((!$(this).is('[readonly]') && e.which == 13)){//check to see if no 'readonly' exists and if enter is pressed

            $(this).addClass("changed");

            {	//form submitting, data
            	/////ajax values reference///
            	//value: queriesToBeExcecuted,
				//id: thisid,
				//column, thiscolum
				
            	queriesToBeExcecuted = $(this).val()
            	console.log("DEBUG " + queriesToBeExcecuted)
            	thisid = $(this).closest('tr').attr('id')
            	console.log("DEBUG " + thisid)
            	thiscolumn = $(this).closest('td').attr('id')

            	$('form#sudoForm').submit();
            }
        }
    });

});