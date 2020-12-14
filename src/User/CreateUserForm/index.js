import SimpleMap from '../../SimpleMap'
import React, { Component } from 'react'
import { Button, Form, Image, Modal, Segment } from 'semantic-ui-react'

export default class CreateUserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      emergencyEmail: '',
      emergencyFirst: '',
      emergencyLast: '',
      first: '',
      last: '',
      lat: '',
      lng: '',
      password: '',
      photo: '',
      username: ''
    }
  }

  componentDidMount() {
    this.createAvatar()
  }

  createAvatar = () => {
    const images = [
      'https://imgur.com/I80W1Q0.png',
      'https://www.businesstyc.com/wp-content/uploads/2019/03/avataaars-2.png',
      'https://www.businesstyc.com/wp-content/uploads/2019/03/avataaars-1.png',
      'https://koolinus.files.wordpress.com/2019/03/avataaars-e28093-koolinus-1-12mar2019.png',
      'https://condor-gaming.com/wp-content/uploads/2020/07/avataaars-10.png',
      'https://res.cloudinary.com/practicaldev/image/fetch/s--7-QYdbFa--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/v719fcr2cu7f41rpuzc1.png',
      'https://condor-gaming.com/wp-content/uploads/2020/06/avataaars-1.png',
      'https://www.businesstyc.com/wp-content/uploads/2019/03/avataaars.png',
      'https://condor-gaming.com/wp-content/uploads/2020/07/avataaars-8.png',
      'https://condor-gaming.com/wp-content/uploads/2020/07/avataaars-15.png',
      'https://condor-gaming.com/wp-content/uploads/2020/06/avataaars-9.png',
      'https://condor-gaming.com/wp-content/uploads/2020/06/avataaars-6.png',
      'https://www.modify.lk/wp-content/uploads/2018/10/avataaars.png',
      'https://www.brandrefinery.co.uk/wp-content/uploads/2018/10/avataaars.png'
    ]
    const avatar = images[Math.floor(Math.random() * 14)]

    this.setState({
      photo: avatar
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.createUser(this.state)
    this.props.toggleCreateUserForm()

    this.setState({
      email: '',
      emergencyEmail: '',
      emergencyFirst: '',
      emergencyLast: '',
      first: '',
      last: '',
      password: '',
      username: ''
    })
  }

  selectLocation = (event) => {
    this.setState({
      lat: event.lat,
      lng: event.lng
    })
  }

  render() {
    const closeOnDimmerClick = false
    return (
      <Modal
        closeIcon
        as={ Form }
        size='tiny'
        open={ this.props.displayCreateUserForm }
        closeOnDimmerClick={ closeOnDimmerClick }
        onClose={ this.props.toggleCreateUserForm }
        onSubmit={ this.handleSubmit }
      >
        <Modal.Header className='orange'>Create New User</Modal.Header>
        <Modal.Content
          className='orange'
          image
        >
          <Segment
            className='green'
            stacked
          >
            <Image
              fluid
              src="https://t4.ftcdn.net/jpg/02/11/73/73/360_F_211737333_nxBcIVfrybNy6nRiewn9Ynh20UJQCfSp.jpg"
            />
            <Modal.Description>
              <Form.Input
                fluid
                required
                type="text"
                name="first"
                placeholder="Enter Your First Name"
                value={ this.state.first }
                onChange={ this.handleChange }
              />
              <Form.Input
                fluid
                required
                type="text"
                name="last"
                placeholder="Enter Your Last Name"
                value={ this.state.last }
                onChange={ this.handleChange }
              />
              <Form.Input
                fluid
                required
                type="text"
                autoComplete="username"
                name="username"
                placeholder="Enter a Username"
                value={ this.state.username }
                onChange={ this.handleChange }
              />
              <Form.Input
                fluid
                required
                type="email"
                autoComplete="email"
                name="email"
                placeholder="Enter an Email"
                value={ this.state.email }
                onChange={ this.handleChange }
              />
              <Form.Input
                fluid
                required
                type="text"
                name="emergencyFirst"
                placeholder="Enter Your Emergency Contact's First Name"
                value={ this.state.emergencyFirst }
                onChange={ this.handleChange }
              />
              <Form.Input
                fluid
                required
                type="text"
                name="emergencyLast"
                placeholder="Enter Your Emergency Contact's Last Name"
                value={ this.state.emergencyLast }
                onChange={ this.handleChange }
              />
              <Form.Input
                fluid
                required
                type="text"
                name="emergencyEmail"
                placeholder="Enter Your Emergency Contact's Email"
                value={ this.state.emergencyEmail }
                onChange={ this.handleChange }
              />
              <Form.Input
                fluid
                required
                type="password"
                autoComplete="new-password"
                name="password"
                placeholder="Enter a Password"
                value={ this.state.password }
                onChange={ this.handleChange }
              />
              <Form.Input
                className='hidden'
                required
                type="text"
                name="lat"
                value={ this.state.lat }
                onChange={ this.handleChange }
              />
              <SimpleMap
                selectLocation={ this.selectLocation }
                lat={ this.state.lat }
                lng={ this.state.lng }
              />
              <Form.Input
                className='hidden'
                required
                type="text"
                name="lng"
                value={ this.state.lng }
                onChange={ this.handleChange }
              />
              <Button
                fluid
                positive
                type="Submit"
                content="Create User"
              />
            </Modal.Description>
          </Segment>
        </Modal.Content>
      </Modal>
    )
  }
}
