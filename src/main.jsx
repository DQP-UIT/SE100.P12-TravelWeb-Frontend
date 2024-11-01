import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import OveralRoomSetting from './pages/roomprovider/OveralRoomSetting.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OveralRoomSetting />
  </StrictMode>,
)
