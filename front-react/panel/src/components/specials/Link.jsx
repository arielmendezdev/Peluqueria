import { NavLink } from 'react-router-dom'

export default function Link({ to, children, ...props}) {
  return (
    <NavLink
        {...props}
        className={({ isActive }) => isActive ? 'active' : ''}
        to={to}
    >
        {children}
    </NavLink>
  )
}