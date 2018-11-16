// Modify header dimension to minimize GUI disruption
$( '#top-menu' ).css( 'height', '2.5em' )
$( '#top-menu' ).css( 'padding', '8px 5px 5px 5px' )
// Force projects to align vertically
$( '#projects-index li' ).css( 'break-inside', 'avoid' )
$( '#projects-index li' ).css( '-webkit-column-break-inside', 'avoid' )
$( '#projects-index li' ).css( 'page-break-inside', 'avoid' )
// Source script file
const scriptURL = 'https://cdn.jsdelivr.net/gh/KyleKing/JSDelivrScripts@latest/cjs-redmine-dist.js'
$( 'body' ).append( `<script src="${scriptURL}"></script>` )

// Create Progress Bar for MM Procedures Progress (Ian)
if ( window.location.href.indexOf( 'MM_Procedures_-_Manufacturing_and_Service' ) !== -1 ) {
  // For tables with 8 columns, store the status text in an array
  //    Based on: https://stackoverflow.com/a/9579792/3219667
  const issueStatuses = []
  var summaryTable = null
  $( '.wiki.wiki-page table tr' ).each( function() {
    // Locate summary table
    if ( summaryTable === null ) {
      if ( $( this ).find( 'th' ).length === 3 )
        summaryTable = this
    }
    // Combine text from all cells
    const cells = $( this ).find( 'td' )
    if ( cells.length === 8 )
      // issueStatuses.push( $( cells[1] ).text() )
      issueStatuses.push( cells[1].textContent.trim() )
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

  if ( summaryTable !== null ) {
    $( summaryTable.parentElement ).find( 'td' ).contents().filter( function() {
      return this.textContent.indexOf( 'COUNT:' ) !== -1
    } ).each( function() {
      // First separate out 'COUNT:' identifier, then count number of tickets for each key separate by '+' signs
      const counts = this.textContent.split( ':' )[1].split( '+' )
        .map( key => issueStatuses.filter( value => value === key.trim() ).length )
      const ticketCount = counts.reduce( ( accum, curr ) => accum + curr )
      // Update text in given cell with calculation
      this.textContent = `${ticketCount} ticket${ticketCount > 1: 's' : ''}${counts.length > 1 ? ` (${counts})` : ''}`
    } )
  }

}

// =====================================================================================================================

// Add menu buttons to trigger different auto-form fills
var rmHref = 'http://bondra.meso-scale.com/redmine/projects/'
const menuItems = document.querySelectorAll( '#top-menu ul' )
if ( menuItems.length === 2 ) {
  crel( document.querySelectorAll( '#top-menu ul' )[1],
    crel( 'li', {}, crel( 'p', {'style': 'margin: 10px'}, ' ' ) ),
    crel( 'li',
      crel( 'a', {'class': 'custom-li-btn', 'href': `${rmHref}methodical-mind/wiki`}, 'MM-Wiki' )
    ),
    crel( 'li',
      crel( 'a', {'class': 'custom-li-btn', 'href': `${rmHref}mm-ita-tool/dmsf`}, 'TCS-DMS' )
    ),
    crel( 'li',
      crel( 'a', {'class': 'custom-li-btn', 'href': `${rmHref}methodical-mind/wiki/MM_Procedures_-_ITA`}, 'TCS-Prog' )
    ),
    crel( 'li',
      crel( 'a', {'class': 'custom-li-btn', 'href': `${rmHref}methodical-mind/wiki/MM_Procedures_-_Manufacturing_and_Service`}, 'MFG-Prog' )  // eslint-disable-line
    ),
    crel( 'li', {}, crel( 'p', {'style': 'margin: 10px'}, ' ' ) ),
    crel( 'li',
      crel( 'a', {'class': 'custom-li-btn', 'href': `${rmHref}s600/dmsf`}, 'S600' )
    ),
    crel( 'li',
      crel( 'a', {'class': 'custom-li-btn', 'href': `${rmHref}m1300/dmsf`}, 'M1300' )
    ),
    crel( 'li',
      crel( 'a', {'class': 'custom-li-btn', 'href': `${rmHref}m1350/dmsf`}, 'M1350' )
    )
  )
}
