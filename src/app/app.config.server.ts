import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
