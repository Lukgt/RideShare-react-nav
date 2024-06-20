import {NavigationContainer} from '@react-navigation/native'

//contexto
import { StackRoutes } from './Stack.routes'
import { BottomTabsRotues } from './Bottom-tab.routes'

//caixa de contextos
export function Routes() {
    return(
        
        <NavigationContainer>
            <StackRoutes />
        </NavigationContainer>
    )
    
}