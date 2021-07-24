import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const AdminCrudArticle = () => {
  return (
    <div style={{height:'100%'}}>
      <List>
        <ListItem button key={'Create Aritlce'}>
          <ListItemIcon>{0 % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={'Create Aritlce'} />
        </ListItem>
        <ListItem button key={'List Article'}>
          <ListItemIcon>{1 % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={'List Article'} />
        </ListItem>
        <ListItem button key={'Spam'}>
          <ListItemIcon>{2 % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={'Spam'} />
        </ListItem>
      </List>
    </div>
  )
}

export default AdminCrudArticle;

