package org.weidza.webbook.maven.plugins.actions;

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.MojoFailureException;
import org.apache.maven.plugins.annotations.LifecyclePhase;
import org.apache.maven.plugins.annotations.Mojo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



/**
 * @author patrickguillerm@gmail.com - Patrick Guillerm
 * @since 20/02/16
 */
@Mojo(name = "generate", defaultPhase = LifecyclePhase.COMPILE)
public class GenerateMojo extends AbstractMojo {


    // =========================================================================
    // ATTRIBUTES
    // =========================================================================
    private final static Logger LOGGER = LoggerFactory.getLogger(GenerateMojo.class);

    // =========================================================================
    // CONSTRUCTOR
    // =========================================================================

    // =========================================================================
    // METHODS
    // =========================================================================
    @Override
    public void execute() throws MojoExecutionException, MojoFailureException {

    }

    // =========================================================================
    // OVERRIDE
    // =========================================================================


    // =========================================================================
    // GETTERS & SETTERS
    // =========================================================================
}
