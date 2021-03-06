/*
1. Install CJS2 for Chrome:
  https://chrome.google.com/webstore/detail/custom-javascript-for-web/ddbjnfjiigjmcpcpkmhogomapikjbjdk
2. Go to http://bondra.meso-scale.com/redmine
3. Open the CJS editor (click the tool bar icon). Click on 'Load External Scripts' and paste:

# Uncomment address of script below or type your own (one per line and must end with semi-colon)
//cdnjs.cloudflare.com/ajax/libs/crel/3.1.0/crel.min.js;

4. In the CJS editor, paste the code from `cjs-custom.js`
*/

/*
For Firefox:
1. Install the Add-on, GreaseMonkey: https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/
2. From the icon, select "New Script"
3. Click the icon again and click the name of new script, then edit
4. Replace the UserScript with the code below

// ==UserScript==
// @name     Bondra-MesoScale
// @version  1
// @grant    none
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/crel/3.1.0/crel.min.js
// ==/UserScript==

5. Below the UserScript section, paste the code from `cjs-custom.js`
*/

/*
*/

// ==================================

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

const colorCell = function( className, value, color, text = '#1B374D' ) {
  // Add highlighting to general issues list and to status tables in Wiki
  const cssPatterns = [
    `td.${className}:contains("${value}")`,
    `.wiki-page td:contains("${value}")`,
  ]
  cssPatterns.map( ( pattern ) => {
    $( pattern ).css( 'background-color', color )
    if ( typeof( text ) === 'string' ) {
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

let colorScheme = [
  [35,  '#1B374D', '#CECECE'],
  [21,  '#0697a8'],
  [1,  '#13c1d6'],
  [-7,  '#ffd087'],
  [-21,  '#FCA720'],
  [false,  '#EE502F'],
]
assignBG( 'div.autoscroll td.due_date', colorScheme )
assignBG( 'div.autoscroll td.cf_12.date', colorScheme )
// // Trick for deep copy without external library
// let csStart = JSON.parse( JSON.stringify( colorScheme ) )
// assignBG( 'div.autoscroll td.start_date', csStart.map( ( group ) => {
//   // Shift dates for color scheme and replace 'false' color
//   if ( typeof( group[0] ) === 'number' )
//     group[0] += 35
//   else
//     group[1] = '#ff8066'
//   return( group )
// } ) )


// Apply GDP date format
let keys = ['start_date', 'cf_12.date', 'due_date']
let monthLookup = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
keys.map( ( className ) => {
  $( `div.autoscroll td.${className}` ).each( function() {
    const date = $( this ).text()
    if ( date.indexOf( '/' ) !== -1 ) {
      const [month, day, year] = date.split( '/' )
      $( this ).text( `${day}${monthLookup[month - 1]}${year}` )
    }
  } )
} )


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
  #top-menu {
    height: 2.5em;
    padding: 8px 5px 5px 5px;
  }
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
    background-color: ##ffffdd !important;
  }

  .wiki-page td:hover {
    background-color: #c3f7f2 !important;
  }

  pre {
    max-height: 450px;
    overflow-y: scroll !important;
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
      background-color: #f7e6ae9e;
      font-size: 1.3em;
      padding: 10px;
  }`,
  `
  /* Extend width of inputs to show full label. Resolves #5939 */
  #dmsf_file_revision_name,
  #dmsf_file_revision_title {
    min-width: 95% !important;
  }

  #new_dmsf_folder span.select2-container,
  #dmsf_folder_title {
    min-width: 65% !important;
  }
  #select2-dmsf_folder_dmsf_folder_id-container {
    min-width: 100% !important;
  }`,
]
const cssDiv = `<style type="text/css">
  ${custStyles.join( '\n' )}
  </style>`

// console.log( `Adding Custom Styles:\n${cssDiv}\n` )
$( 'head' ).append( cssDiv )


//
// Keyboard Shortcuts
//

// Add a gray background to specific text including in back ticks using ctrl_shift+h keyboard shortcut`
const highlightText = function() {
  const targetId = document.activeElement.id
  if ( targetId.length > 0 ) {
    console.log( `Highlighting text for: #${targetId}` )
    const text = $( `#${targetId}` ).val()
    const withSyntaxHighlight = text.replace( /`([^`]+)`/g, '%{background:#ededed}$1%' )
    $( `#${targetId}` ).val( withSyntaxHighlight )
  }
}
document.addEventListener( 'keydown', ( event ) => {
  if ( event.ctrlKey && event.key === '`' )
    highlightText()
} )

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


// Set the References, Resolution, and Progress Summary to blank if at default
const ids = [1, 2, 32]
ids.map( ( idNum ) => {
  const idTextInput = `#issue_custom_field_values_${idNum}`
  const val = $( idTextInput ).val()
  if ( val === 'None' || val === 'text' || val === 'TBD' || val === 'to be updated.' )
    $( idTextInput ).val( '' )
} )
