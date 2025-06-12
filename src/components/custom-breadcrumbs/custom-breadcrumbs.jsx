import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import LinkItem from './link-item'
import Iconify from "../iconify/index.js";
import {IconButton} from "@mui/material";

export default function CustomBreadcrumbs({
                                            links = [],
                                            action,
                                            mobileActions,
                                            heading,
                                            backButton,
                                            moreLink,
                                            activeLast,
                                            sx,
                                            ...other
                                          }) {
  const isMobile = (window.innerWidth < 600)
  const lastLink = links.length ? links[links.length - 1].name : ''

  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <Box sx={{...sx}}>
      <Stack direction="row" alignItems="center">
        <Box sx={{flexGrow: 1}}>
          {heading && (
            <Stack direction="row">
              {backButton && (
                <IconButton onClick={handleGoBack}>
                  <Iconify icon="eva:arrow-ios-back-fill" width={24}/>
                </IconButton>
              )}
              <Typography variant="h4" gutterBottom>
                {heading}
              </Typography>
            </Stack>
          )}

          {!!links.length && (
            <Breadcrumbs separator={<Separator/>} {...other}>
              {links.map((link) => (
                <LinkItem
                  key={link.name || ''}
                  link={link}
                  activeLast={activeLast}
                  disabled={link.name === lastLink}
                />
              ))}
            </Breadcrumbs>
          )}
        </Box>

        {isMobile ? (
          <Box sx={{flexShrink: 0}}> {mobileActions} </Box>
        ) : (
          action && <Box sx={{flexShrink: 0}}> {action} </Box>
        )}
      </Stack>

      {!!moreLink && (
        <Box sx={{mt: 2}}>
          {moreLink.map((href) => (
            <Link
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{display: 'table'}}
            >
              {href}
            </Link>
          ))}
        </Box>
      )}
    </Box>
  )
}

CustomBreadcrumbs.propTypes = {
  sx: PropTypes.object,
  action: PropTypes.node,
  mobileActions: PropTypes.node,
  backButton: PropTypes.bool,
  links: PropTypes.array,
  heading: PropTypes.string,
  moreLink: PropTypes.array,
  activeLast: PropTypes.bool
}

CustomBreadcrumbs.defaultProps = {
  links: [],
}

function Separator() {
  return (
    <Box
      component="span"
      sx={{
        width: 4,
        height: 4,
        borderRadius: '50%',
        bgcolor: 'text.disabled'
      }}
    />
  )
}
