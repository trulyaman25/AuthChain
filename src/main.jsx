import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RouteConfig from './routes.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouteConfig />
	</StrictMode>,
)