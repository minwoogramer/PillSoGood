import { StackNavigationProp } from '@react-navigation/stack'
import { ReminderParamList } from '../../navigators/Stack/HealthStack/ReminderStackScreen'

export interface ReminderScreenProps {
  navigation: StackNavigationProp<ReminderParamList, 'Home'>
}
