
$( document ).ready(function() {

//////LOADING SCREEN//////
$('#loadingContainer').css('display','none')//goes away once document loads

//////POST REQUESTS //////
$('#sudoForm').on('submit',(e)=>{//Change table item post req

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

	e.preventDefault();
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

//////TOP PORTION FUNCTIONALITY//////

$("#searchbox").on("keypress", function(e){//searchbar row filtering

	if((!$(this).is('[readonly]') && e.which == 13)){//13 = enter key

		let searchVal = $(this).val().toUpperCase()//word typed in search bar

		if (searchVal === ''){//if the search is empty, just reload table
			location.reload(true)
		}

		let columnLength = $('th').length//get length of columns. Example, 16 columns exist right now

		let count = 1//the count keeps track of how many columns exist, and when a new row is being analyzed

		let matchedWord = false

		$('#mainTable tr td').each((i,row)=>{
			//row = each td
			//td child consists of the 'input' with the value to be compared against
			//$(row).children().val() = actual value to be compared
			//$(row).parent() = actual table row

			let dataEntry = $(row).children().val().toUpperCase()

			if(dataEntry.indexOf(searchVal) != -1){//locate if searchval exists in searchval
				matchedWord = true//a match was found
			}

			count++

			if(count > columnLength){//16
				if (matchedWord == false){
					$(row).parent().fadeOut('slow')//hide parent if no previous matches were found
				}
				count = 1//reset count
				matchedWord = false//reset value
			}


		})

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