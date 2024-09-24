import {Command} from 'commander'

const commander = new Command()

commander
    .option('--mode <mode>', 'Modo de ejecución')
    .parse()

export default commander
