package com.manning.spa.spring;

import com.google.apphosting.api.ApiProxy;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.XmlWebApplicationContext;
import org.springframework.web.servlet.support.AbstractDispatcherServletInitializer;

@Configuration
public class DefaultWebApplicationInitializer extends AbstractDispatcherServletInitializer {

    private final String GAE_PLATFORM = "gae";

    @Override
    protected WebApplicationContext createRootApplicationContext() {
        return null;
    }

    @Override
    protected WebApplicationContext createServletApplicationContext() {
        XmlWebApplicationContext cxt = new XmlWebApplicationContext();
        cxt.setConfigLocations(new String[]{
            "classpath:spring/env-config.xml",
            "classpath:spring/mvc-core-config.xml"
        });
        addActiveProfiles(cxt);
        return cxt;
    }

    private void addActiveProfiles(XmlWebApplicationContext cxt) {
        if(ApiProxy.getCurrentEnvironment() != null) {
            cxt.getEnvironment().addActiveProfile(ApiProxy.getCurrentEnvironment().getVersionId());
            cxt.getEnvironment().addActiveProfile(GAE_PLATFORM);
        }
    }

    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }
}
