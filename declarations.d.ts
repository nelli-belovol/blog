
import 'styled-components';

type AppTheme = {
	[key: string]: string | number | undefined;
};

declare module 'styled-components' {
	export interface DefaultTheme extends AppTheme { }
}
