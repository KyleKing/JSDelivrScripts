/*
1. Install CJS2 for Chrome: https://chrome.google.com/webstore/detail/custom-javascript-for-web/ddbjnfjiigjmcpcpkmhogomapikjbjdk
2. Go to http://bondra.meso-scale.com/redmine
3. Open the CJS editor (click the tool bar icon). Click on 'Load External Scripts' and paste:

# Uncomment address of script below or type your own (one per line and must end with semi-colon)
//cdnjs.cloudflare.com/ajax/libs/crel/3.1.0/crel.min.js;

4. In the CJS editor, paste the below snippet
*/

/*
// Modify header dimension to minimize GUI disruption
$( '#top-menu' ).css( 'height', '2.5em' )
$( '#top-menu' ).css( 'padding', '8px 5px 5px 5px' )
// Source script file
$( 'body' ).append( '<script src="https://cdn.jsdelivr.net/gh/KyleKing/JSDelivrScripts@0/cjs-redmine-dist.js"></script>' )

// Ian - Create Progress Bar

if ( window.location.href.indexOf( 'MM_Procedures_-_Manufacturing_and_Service' ) !== -1 ) {
  // For tables with 8 columns, store the status text in an array
  //    Based on: https://stackoverflow.com/a/9579792/3219667
  const issueStatuses = []
  $( '.wiki.wiki-page table tr' ).each( function() {
    const cells = $( this ).find( 'td' )
    if ( cells.length === 8 )
      issueStatuses.push( $( cells[1] ).text() )
  } )
  // Calculate the current progress
  const countCompl = issueStatuses.filter( value => value === 'Complete' ).length
  const progress = Math.floor( countCompl / issueStatuses.length * 100 )

  // Create target for Crel to replace
  const h6Target = $( $( 'h6' )[0] )
  h6Target.after( '<div id="progress-crel-target"></div>' )

  // Generate Table with Crel
  crel( document.querySelector( '#progress-crel-target' ),
    crel( 'h2', `Progress ${progress}% (${countCompl} Complete of ${issueStatuses.length}):` ),
    crel( 'div', {'class': 'value', 'style': 'height: 45px'},
      crel( 'table', {'class': `progress progress-${progress}`, 'style': 'display: inline-table'},
        crel( 'tbody',
          crel( 'tr',
            crel( 'td', {'class': 'closed', 'style': `width: ${progress}%`, 'title': `${progress}%`} ),
            crel( 'td', {'class': 'todo', 'style': `width: ${100 - progress}%`} )
          )
        )
      )
    )
  )

  // Remove original target
  h6Target.remove()
}

*/


/*
For Firefox:
1. Install the Add-on, GreaseMonkey: https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/
2. From the icon, select "New Script"
3. Click the icon again and click the name of new script, then edit
4. Replace the UserScript with the code below
5. Below the UserScript, paste the same code from Chrome/CJS2 (above)
*/

/*
// ==UserScript==
// @name     Bondra-MesoScale
// @version  1
// @grant    none
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==
*/

// ==================================

//  Add colors to table cell boxes

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
  colorCell( 'status', 'NA', '#ababab' )
  colorCell( 'status', 'N/A', '#ababab' )
  colorCell( 'status', 'New', '#C0DBCC' )
  colorCell( 'status', 'Assigned', '#C0DBCC' )
  colorCell( 'status', 'Accepted', '#C0DBCC' )
  colorCell( 'status', 'Reassigned', '#C0DBCC' )
  colorCell( 'status', 'Input', '#628db6' )
  colorCell( 'status', 'On Hold', '#231942' )
  colorCell( 'status', 'Defer Until', '#231942' )
  colorCell( 'status', 'Queue', '#c3f7f2' )
  colorCell( 'status', 'In Progress', '#968ef9' )
  colorCell( 'status', 'PCO/DCR Process', '#968ef9' )
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

const assignBG = function( cell, colorMap ) {
  $( cell ).each( function() {
    // Get text from due date (MM/DD/YYYY)
    const value = $( this ).text()
    if ( value.length > 0 ) {
      // Convert string date to unix timestamp (ms) and determine elapsed time from today
      const diffMS = Date.parse( value ) - Date.now()
      const diffDays = diffMS / ( 1000 * 60 * 60 * 24 )

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


// Create dynamic CSS styles

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

]
const cssDiv = `<style type="text/css">
  ${custStyles.join( '\n' )}
  </style>`

// console.log( `Adding Custom Styles:\n${cssDiv}\n` )
$( 'head' ).append( cssDiv )
