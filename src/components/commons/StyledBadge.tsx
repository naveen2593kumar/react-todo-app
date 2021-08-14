import { Badge, withStyles } from "@material-ui/core";

/**
 * This is HoC component having styles within it
 */
const StyledBadge = withStyles((theme) => ({
    badge: {
        right: '50%',
        top: -8,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

export default StyledBadge;