import { useState, useImperativeHandle, forwardRef } from "react"
import PropTypes from "prop-types"
import { Button } from "@mui/material"
const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  Togglable.displayName = "Togglable"

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </div>
  )
})

export default Togglable
