// 1. Add CJS2 to Chrome: https://chrome.google.com/webstore/detail/custom-javascript-for-web/ddbjnfjiigjmcpcpkmhogomapikjbjdk
// 2. Go to http://bondra.meso-scale.com/redmine
// 3. Open the CJS editor. Paste the below snippet between the asterisks into the editor:

/*
// Modify header dimension to minimize GUI disruption
$( '#top-menu' ).css( 'height', '2.5em' )
$( '#top-menu' ).css( 'padding', '8px 5px 5px 5px' )
// Source script file
$( 'body' ).append(`
  <script src="https://rawgit.com/KyleKing/8291f225868692e9d43ab552e4a35ae6/raw/cjs-redmine-dist.js"></script>
`)
*/


// For Firefox:
// 1. Install the Add-on, GreaseMonkey: https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/
// 2. From the icon, select new script
// 3. Click the icon again and click the new script, then edit
// 4. Paste the below snippet between the asterisks into the editor replacing any existing code:

/*
// ==UserScript==
// @name     Bondra-MesoScale
// @version  1
// @grant    none
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

// Modify header dimension to minimize GUI disruption
$( '#top-menu' ).css( 'height', '2.5em' )
$( '#top-menu' ).css( 'padding', '8px 5px 5px 5px' )
// Source script file
$( 'body' ).append(`
  <script src="https://rawgit.com/KyleKing/8291f225868692e9d43ab552e4a35ae6/raw/cjs-redmine-dist.js"></script>
`)
*/

// ==================================

//
// Pre-Populate Fields in Ticket
//

// Set the Resolution to TBD if still at default
const idInput = '#issue_custom_field_values_2'
if ( $( idInput ).val() === 'text' )
  $( idInput ).val( 'TBD' )


//
//  Improve UI
//

// Set the col name to briefer title
$( 'th > a' ).each( function() {
  if ( this.outerText === 'Desired Completion Date' )
    $( this ).text( 'Desired' )
} )

// Abbreviate the Fixed Version Names
$( 'td.fixed_version > a' ).each( ( i, elem ) => {
  // console.log( elem.outerText )
  const rUniqVerName = /[^-]+\s+-\s+(.*)/
  const match = rUniqVerName.exec( elem.outerText )
  if ( match )
    elem.innerHTML = match[1]
} )

//
//  Add colors to table cell boxes
//

const colorCell = function( className, value, color ) {
  // Add highlighting to general issues list
  $( `td.${className}:contains("${value}")` ).css( 'background-color', color )
  // Add highlighting to status tables in Wiki
  $( `.wiki-page td:contains("${value}")` ).css( 'background-color', color )
}
if ( window.location.href.indexOf( 'MM_Procedures_-_Manufacturing_and_Service' ) !== -1 ) {
  // custom colors for Ian's Redmine tracker
  colorCell( 'status', 'Complete', '#ababab' )
  colorCell( 'status', 'Rejected', '#E6B8B8' )
  colorCell( 'status', 'On Hold', '#f4f489' )
  colorCell( 'status', 'Accepted', '#badcba' )
  colorCell( 'status', 'PCO/DCR Process', '#5cba5c' )
} else {
  colorCell( 'status', 'New', '#C0DBCC' )
  colorCell( 'status', 'Assigned', '#C0DBCC' )
  colorCell( 'status', 'Accepted', '#C0DBCC' )
  colorCell( 'status', 'Reassigned', '#C0DBCC' )
  colorCell( 'status', 'Input', '#628db6' )
  colorCell( 'status', 'On Hold', '#231942' )
  colorCell( 'status', 'Defer Until', '#231942' )
  colorCell( 'status', 'Queue', '#c3f7f2' )
  colorCell( 'status', 'In Progress', '#968ef9' )
  colorCell( 'status', 'Review', '#628db6' )
  colorCell( 'status', 'Rejected', '#E85555' )
  colorCell( 'status', 'Complete', '#55E897' )

  colorCell( 'status', 'Invalid issue ID', '#ffff00' )

  $( 'td.subject > a' ).css( 'font-weight', '400' )

  $( 'td.priority:contains("Low")' ).css( 'color', '#CECECE' )
  colorCell( 'priority', 'Normal', '#C0DBCC' ) // '#55E897' )
  colorCell( 'priority', 'High', '#E88655' )
  colorCell( 'priority', 'Urgent', '#E85555' )
  colorCell( 'priority', 'Immediate', '#E85555' )
}


// Other Color Sites:
// https://htmlcolorcodes.com/resources/best-color-palette-generators/
// https://mycolor.space/
// http://colormind.io/

const assignBG = function( cell, colorMap ) {
  $( cell ).each( function() {
    // Get text from due date (MM/DD/YYYY)
    const value = $( this ).text()
    if ( value.length > 0 ) {
      // Convert string date to unix timestamp (ms) and determine elapsed time from today
      const diffMS = Date.parse( value ) - Date.now()
      const diffDays = diffMS / ( 1000 * 60 * 60 * 24 )

      // FYI: 8-Digit Hex ends with opacity. See table: https://stackoverflow.com/a/25170174/3219667

      // Theme: https://coolors.co/4f000b-720026-ce4257-ff7f51-ff9b54
      // Alt: https://coolors.co/f9dbbd-ffa5ab-da627d-a53860-450920
      // Alt: https://coolors.co/f9dbbd-ffa5ab-da627d-a53860-450920
      let bgColor = ''
      for ( let group of colorMap ) {
        if ( typeof( group[0] ) === 'number' ) {
          if ( diffDays >= group[0] ) {
            bgColor = group[1]
            break
          }
        } else
          bgColor = group[1]
      }
      // console.log( `diffDays=${diffDays} / bgColor=${bgColor}` )

      if ( bgColor.length > 0 )
        $( this ).css( 'background-color', bgColor )
    }
  } )
}

assignBG( 'div.autoscroll td.due_date', [
  [31,  '#4F000B'],
  [7,  '#720026'],
  [-1,  '#FF9B54'],
  [-10,  '#FF7F51'],
  [false,  '#CE4257'],
] )

assignBG( 'div.autoscroll td.start_date', [
  [60,  '#231942'],
  [31,  '#5E548E'],
  [7,  '#9F86C0'],
  [-1,  '#BE95C4'],
  [-15,  '#E0B1CB'],
  [false,  '#FF9B54'],
] )


//
// Create dynamic CSS styles
//

const custStyles = [
  `
  /* Increase the size of the  expander button for grouped issues */
  table.issues span.expander {
    padding: 8px;
    margin-right: 8px;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}`,
  `
  .wiki img {
      max-width: 60% !important;
      max-height: 600px !important;
  }
  table span.icon-issue {
    background-color: #ffdddd;
  }

  /* Increase the menu size to make the elements easier to click */
  /* #top-menu {
    height: 2.5em;
    padding: 8px 5px 5px 5px;
  } >> Now declared in CJS pop-up for faster load */
  #top-menu ul li a {
    border: 1px solid #628db6;
    border-radius: 4px;
    font-size: 1.5em;
    padding: 5px 10px;
  }
  #top-menu ul li a:hover {
    background-color: #628db6;
    border: 1px solid white;
    text-decoration: none;
  }

  #projects-index li {
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
  }

  td.last_notes {
    background-color: #e2e1e1;
  }

  td.status:hover,
  td.priority:hover,
  td.due_date:hover,
  td.start_date:hover {
    background-color: #c3f7f2 !important;
  }

  .wiki-page td:hover {
    background-color: #c3f7f2 !important;
  }

  pre {
    max-height: 900px;
    overflow-y: auto;
  }

  .journal.has-notes .wiki {
    background-color: #fdfde6;
    border: 3px ridge rgba(134, 179, 222, 0.6);
    padding: 8px;
  }
  .journal.has-notes.private-notes {
    background-color: #ffc1c199;
  }`,
  `
  #button-panel {
    position: fixed;
    top: 0;
    left: 450px;
    background-color: #c3f7f2 !important;
  }

  ul.toc {
      font-size: 1.3em;
      padding: 10px;
  }`,
  // Experiment with setting color variables
  // `
  // :root {
  //   --main-bg-color: #e0e0e0;
  //   --main-bg-accent-bright: #777777;
  //   --main-bg-accent-dull: #474747;
  //
  //   --main-font-color: #ffffff;
  //   --main-font-color-alt: #e0e0e0;
  //   --link-font-color: #ffc8a3;
  //
  //   --button-bg: #628db6;
  //   --button-bg-hover: #628db6;
  //   --button-border: #628db6;
  //   --button-border-hover: white;
  //
  //   --purple: brown;
  //   --orange: brown;
  //   --green-bright: #5fdeaf;
  //   --green-dull: #b5bd68;
  //   --blue: brown;
  // }
  //
  // body {
  //   background-color: var(--main-bg-color) ;
  //   color: var(--main-font-color);
  // }`,

]
const cssDiv = `<style type="text/css">
  ${custStyles.join( '\n' )}
  </style>`

// console.log( `Adding Custom Styles:\n${cssDiv}\n` )
$( 'head' ).append( cssDiv )

//
// Code from autfill form
//  Plan to create buttons on top, which can autocomplete on demand
//

// Add shortcut for "ctrl enter" to submit either edits to a note or edits to a form
document.addEventListener( 'keydown', ( event ) => {
  if ( event.ctrlKey && event.key === 'Enter' && document.getElementById( 'issue-form' ) ) {
    // If editing a comment, submit that form. Otherwise submit the full ticket
    if ( document.activeElement.id.indexOf( 'journal' ) === 0 )
      $( '.journal.has-notes [name="commit"]' )[0].click()
    else if ( document.activeElement.form.id === 'issue-form' )
      $( '#issue-form [name="commit"]' )[0].form.submit()
    else
      console.warn( `Unknown form: ${document.activeElement}` )
  }
} )

// // Can't prevent filter...
// $( 'a' ).on( 'click', ( ) => {
//   // TODO: set only for buttons that create the pop-up
//   console.log( ' click! ' )
//
//   // Add quick filter when adding watchers
//   const addWatcherFormWatcher = function( id ) {
//     const form = document.getElementById( id )
//     if ( form  != null ) {
//       console.log( `Found ${id}!` )
//       // Remove autocomplete dropdown
//       const input = $( `#${id} #user_search` )
//       input.removeClass( 'autocomplete' )
//       input.attr( 'autocomplete', 'off' )
//       // Add keyboard watcher
//       // for ( let val of ['keypress', 'keydown', 'keyup', 'mouseover', 'select', 'focus', 'click', 'input'] ) {
//       // // for ( let val of ['keyup'] ) {
//       //   console.log( val )
//       // // form.addEventListener( val, ( event ) => {
//       form.addEventListener( 'keydown', ( event ) => {
//         // event.preventDefault()
//         // console.log( `PREVENTED keydown for ${event.key}` )
//
//         console.log( `Observed keydown for ${event.key}` )
//
//         input.value = input.value + event.key
//       } )
//       // }
//     }
//   }
//
//   // form.removeAttr( 'id' )
//
//   // setTimeout( () => { addWatcherFormWatcher( 'users_for_watcher' ) }, 200 )
//   setTimeout( () => { addWatcherFormWatcher( 'new-watcher-form' ) }, 200 )
// } )


// // // FYI: Disable temporarily for local development
// // Add menu buttons to trigger different auto-form fills
// const menuItems = document.querySelectorAll( '#top-menu ul' )
// if ( menuItems.length === 2 ) {
//   crel( document.querySelectorAll( '#top-menu ul' )[1],
//     crel( 'li',
//       crel( 'a', {'class': 'custom-li-btn', 'onclick': 'alert("old")'}, 'Alert!' )
//     )
//   )
// } else {
//   console.log( `Unknown length of menuItems: ${menuItems.length}` )
//   console.log( menuItems )
// }


// function padThat( value, depth = 2 ) {
//   // Add zeros to value until given depth (int 1 > str 01)
//   return( String( value ).padStart( depth, '0' ) )
// }

// function updateTS( elemName, diffDays = 0 ) {
//   // Format the new timestamp for given element and diff
//   const dt = new Date()
//   dt.setDate( dt.getDate() + diffDays )
//   const newVal = `${dt.getFullYear()}-${padThat( dt.getMonth() + 1 )}-${padThat( dt.getDate() )}`
//   document.getElementById( elemName ).value = newVal
// }

// updateTS( 'issue_start_date' )
// updateTS( 'issue_custom_field_values_12', 14 )  // desired due date
// updateTS( 'issue_due_date', 21 )

// Pipette Module
// http://bondra.meso-scale.com/redmine/projects/pipetting-module/issues/new
// ^issue\[tracker_id\]$  1
// ^issue\[status_id\]$  3
// ^issue\[priority_id\]$  1
// ^issue\[assigned_to_id\]$  1
// ^issue\[parent_issue_id\]$  101
// ^issue\[estimated_hours\]$  10
// ^issue\[done_ratio\]$  0
// ^issue\[custom_field_values\]\[7\]$  5
// ^issue\[category_id\]$  3
// ^issue\[fixed_version_id\]$  2

// MERA - Ken
// http://bondra.meso-scale.com/redmine/projects/kp_redmine/issues/new
// ^issue\[tracker_id\]$  3
// ^issue\[status_id\]$  0
// ^issue\[priority_id\]$  1
// ^issue\[assigned_to_id\]$  34
// ^issue\[custom_field_values\]\[7\]$  23
// ^issue\[custom_field_values\]\[8\]$  0
// ^issue\[fixed_version_id\]$  0

// SySE
// http://bondra.meso-scale.com/redmine/projects/systems-engineering/issues/new
// ^issue\[tracker_id\]$  8
// ^issue\[priority_id\]$  1
// ^issue\[assigned_to_id\]$  1
// ^issue\[custom_field_values\]\[7\]$  4


//
// Archived: Adding 'checkout' button that both downloads and locks file
//

// // Create Check-In/Check-out Functionality
// function click( selector ) {
//   console.log( 'Attempting to click: "' + selector + '"' )
//   document.querySelector( selector ).click()
// }
// // click( '.filetype-xlsx.dmsf-icon-file' )
// // click( '.icon-lock' )

// const table = document.getElementById( 'browser' )
// if ( table ) {
//   console.log( table )
//   // src: https://stackoverflow.com/questions/3065342/how-do-i-iterate-through-table-rows-and-cells-in-javascript
//   for ( let i = 0, row; ( row = table.rows[i] ); i++ ) {
//     console.log( 'row' )
//     console.log( row )
//     for ( let col, j = 0; ( col = row.cells[j] ); j++ )
//       console.log( col )
//   }
// }

//
// Archive
//

// // Add DMSF ID to Filename {Ken added this feature to Redmine}
// function updateElemID ( rID, elem ) {
//   const elemID = rID.exec( elem.href )
//   console.log( `Updating DMSF Name for elemID #${elemID[1]}` )
//   elem.innerHTML = `(${elemID[1]}) ${elem.innerHTML}`
// }
// // Apply to both files and folders
// $( 'a.icon-file' ).each( ( i, elem ) => {
//   const rDocID = /\/(\d+)\/view/
//   updateElemID ( rDocID, elem )
// } )
// $( 'a.icon-folder' ).each( ( i, elem ) => {
//   const rDirID = /folder_id=(\d+)/
//   updateElemID ( rDirID, elem )
// } )
