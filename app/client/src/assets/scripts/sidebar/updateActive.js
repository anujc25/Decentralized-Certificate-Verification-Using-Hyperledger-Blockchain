import * as $ from 'jquery'

export function UpdateActiveLink (currentSidebarValue) {
  // Sidebar Activity Class
  const sidebarLinks = $('.sidebar').find('.sidebar-link')

  sidebarLinks
    .each((index, el) => {
      console.log(el.innerText)
      if (el.innerText === currentSidebarValue) {
        $(el).addClass('active')
      } else {
        $(el).removeClass('active')
      }
    })
}

export default UpdateActiveLink
