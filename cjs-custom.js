// Modify header dimension to minimize GUI disruption
$( '#top-menu' ).css( 'height', '2.5em' )
$( '#top-menu' ).css( 'padding', '8px 5px 5px 5px' )
// Source script file
$( 'body' ).append( '<script src="https://cdn.jsdelivr.net/gh/KyleKing/JSDelivrScripts@0/cjs-redmine.js"></script>' )

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
  if ( event.ctrlKey && event.shiftKey && event.key === 'H' )
    highlightText()
} )


// Add menu buttons to trigger different auto-form fills
var rmHref = 'http://bondra.meso-scale.com/redmine/projects/'
const menuItems = document.querySelectorAll( '#top-menu ul' )
if ( menuItems.length === 2 ) {
  crel( document.querySelectorAll( '#top-menu ul' )[1],
    crel( 'li',
      crel( 'a', {'class': 'custom-li-btn', 'href': `${rmHref}methodical-mind/wiki`}, 'MM' )
    ),
    crel( 'li',
      crel( 'a', {'class': 'custom-li-btn', 'href': `${rmHref}mm-ita-tool/dmsf`}, 'ITA' )
    )
  )
}

// Set the Resolution and Progress Summary to TBD if either still at default
const idResolution = '#issue_custom_field_values_1'
if ( $( idResolution ).val() === 'text' )
  $( idResolution ).val( 'TBD' )
const idProgSum = '#issue_custom_field_values_32'
if ( $( idProgSum ).val() === 'to be updated.' )
  $( idProgSum ).val( 'TBD' )

// =====================================================================================================================

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
