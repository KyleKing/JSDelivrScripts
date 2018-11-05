/*

See install guide in cjs-redmine-dist.js:
https://github.com/KyleKing/JSDelivrScripts/blob/master/cjs-redmine-dist.js

*/


// // Color Sites:
// https://htmlcolorcodes.com/resources/best-color-palette-generators/
// https://mycolor.space/
// http://colormind.io/

// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------

//
// Code from autfill form
//  Plan to create buttons on top, which can autocomplete on demand
//

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
