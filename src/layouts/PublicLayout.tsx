import { Outlet } from "react-router-dom"

const PublicLayout = () => {
  return (
    <div className='flex w-full min-h-screen'>
      <Outlet/>
    </div>
  )
}

export default PublicLayout
