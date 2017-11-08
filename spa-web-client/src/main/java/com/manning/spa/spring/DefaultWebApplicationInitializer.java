package com.manning.spa.spring;

import com.google.appengine.api.utils.SystemProperty;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.XmlWebApplicationContext;
import org.springframework.web.servlet.support.AbstractDispatcherServletInitializer;

import java.util.logging.Logger;

public class DefaultWebApplicationInitializer extends AbstractDispatcherServletInitializer {
    private final static Logger logger = Logger.getLogger(DefaultWebApplicationInitializer.class.getName());

    private final String GAE_PLATFORM = "gae";
    private final int MAJOR_VERSION = 0;
    private final int MINOR_VERSION = 1;

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
        logger.info("Environment: " + SystemProperty.environment.value() );

        if (SystemProperty.environment.value() == SystemProperty.Environment.Value.Production) {
            cxt.getEnvironment().addActiveProfile(determineEnvironment(SystemProperty.applicationVersion.get()));
            cxt.getEnvironment().addActiveProfile(GAE_PLATFORM);
        }

    }

    private String determineEnvironment(String majorAndMinorVersion) {
        String[] version = majorAndMinorVersion.split("\\.");
        return version[MAJOR_VERSION];
    }

    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }
}
