/*

See install guide in cjs-redmine-dist.js:
https://github.com/KyleKing/JSDelivrScripts/blob/master/cjs-redmine-dist.js

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
// // Color Sites:
// https://htmlcolorcodes.com/resources/best-color-palette-generators/
// https://mycolor.space/
// http://colormind.io/
//


//
//  Add colors to table cell boxes
//

const colorCell = function( className, value, color, text = '#1B374D', hover = '#c3f7f2' ) {
  // Add highlighting to general issues list and to status tables in Wiki
  const cssPatterns = [
    `td.${className}:contains("${value}")`,
    `.wiki-page td:contains("${value}")`,
  ]
  cssPatterns.map( ( pattern ) => {
    $( pattern ).css( 'background-color', color )
    if ( text !== false ) {
      $( pattern ).css( 'color', text )
      $( `${pattern} a` ).css( 'color', text )
    }
  } )
}
if ( window.location.href.indexOf( 'MM_Procedures_-_Manufacturing_and_Service' ) !== -1 ) {
  // custom colors for Ian's Redmine tracker
  colorCell( 'status', 'Complete', '#CECECE', false )
  colorCell( 'status', 'Rejected', '#E6B8B8', false )
  colorCell( 'status', 'On Hold', '#f4f489', false )
  colorCell( 'status', 'Accepted', '#badcba', false )
  colorCell( 'status', 'PCO/DCR Process', '#5cba5c', false )
} else {
  colorCell( 'status', 'NA', '#CECECE', '#b5b5b5' )
  colorCell( 'status', 'N/A', '#CECECE', '#b5b5b5' )
  colorCell( 'status', 'Not Required', '#CECECE', '#b5b5b5' )
  colorCell( 'status', 'New', '#C6ECD8' )
  colorCell( 'status', 'Assigned', '#C6ECD8' )
  colorCell( 'status', 'Accepted', '#C6ECD8' )
  colorCell( 'status', 'Reassigned', '#C6ECD8' )
  colorCell( 'status', 'Input', '#e6c6ec' )
  colorCell( 'status', 'On Hold', '#1B374D', '#CECECE' )
  colorCell( 'status', 'Defer Until', '#1B374D', '#CECECE' )
  colorCell( 'status', 'Queue', '#c3f7f2' )
  colorCell( 'status', 'In Progress', '#13c1d6' )
  colorCell( 'status', 'PCO/DCR Process', '#0697a8', '#bae5ff' )
  colorCell( 'status', 'Review', '#0697a8' )
  colorCell( 'status', 'Rejected', '#ecdcc6' )
  colorCell( 'status', 'Complete', '#7dc493' )

  colorCell( 'status', 'Invalid issue ID', '#ffff00' )

  $( 'td.subject > a' ).css( 'font-weight', '400' )

  colorCell( 'priority', 'Low', '#CECECE' )
  colorCell( 'priority', 'Normal', '#e1f2e9' )
  colorCell( 'priority', 'High', '#FCA720' )
  colorCell( 'priority', 'Urgent', '#EE502F' )
  colorCell( 'priority', 'Immediate', '#EE502F' )
}


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
      let textColor = ''
      for ( let group of colorMap ) {
        if ( typeof( group[0] ) === 'number' ) {
          if ( diffDays >= group[0] ) {
            bgColor = group[1]
            if ( group.length === 3 )
              textColor = group[2]
            break
          }
        } else
          bgColor = group[1]
      }
      // console.log( `diffDays=${diffDays} / bgColor=${bgColor}` )

      if ( bgColor.length > 0 ) {
        $( this ).css( 'background-color', bgColor )
        if ( textColor.length > 0 )
          $( this ).css( 'color', textColor )
      }
    }
  } )
}

// Semi-Color Scheme
// '#EE502F'
// '#FCA720'
// '#f4f489'
// '#e6c6ec'
// '#C6ECD8'
// '#13c1d6'
// '#0697a8'
// '#1B374D', '#CECECE'

let colorScheme = [
  [45,  '#1B374D', '#CECECE'],
  [31,  '#C6ECD8'],
  [7,  '#13c1d6'],
  [-7,  '#e6c6ec'],
  [-15,  '#ffd087'],
  [-31,  '#FCA720'],
  [false,  '#EE502F'],
]
assignBG( 'div.autoscroll td.due_date', colorScheme )
assignBG( 'div.autoscroll td.start_date', colorScheme.map( ( group ) => {
  // Shift date for color scheme and replace 'false' color
  if ( typeof( group[0] ) === 'number' )
    group[0] -= 35
  else
    group[1] = '#ff8066'
  return( group )
} ) )


// FYI: Old pattern
// assignBG( 'div.autoscroll td.due_date', [
//   [31,  '#4F000B'],
//   [7,  '#720026'],
//   [-1,  '#FF9B54'],
//   [-10,  '#FF7F51'],
//   [false,  '#CE4257'],
// ] )
// assignBG( 'div.autoscroll td.start_date', [
//   [60,  '#1B374D'],
//   [31,  '#5E548E'],
//   [7,  '#9F86C0'],
//   [-1,  '#BE95C4'],
//   [-15,  '#E0B1CB'],
//   [false,  '#FF9B54'],
// ] )


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

  /* #projects-index li {
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
  } >> Now declared in CJS pop-up for faster load */

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
