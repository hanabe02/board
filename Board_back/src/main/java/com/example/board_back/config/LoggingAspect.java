package com.example.board_back.config;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class LoggingAspect {

    @Around("execution(* com.example.board_back..controller..*(..)) || " +
            "execution(* com.example.board_back..service..*(..)) || " +
            "execution(* com.example.board_back..dto..*(..))")
    public Object logMethodEntry(ProceedingJoinPoint joinPoint) throws Throwable {
        String className = joinPoint.getSignature().getDeclaringTypeName();
        String methodName = joinPoint.getSignature().getName();

        String layer = "[UNKNOWN]";
        if (className.contains(".controller")) {
            layer = "[CONTROLLER]";
        } else if (className.contains(".service")) {
            layer = "[SERVICE]";
        } else if (className.contains(".dto")) {
            layer = "[DTO]";
        }

        log.info("{} 진입: {}.{}()", layer, className, methodName);

        return joinPoint.proceed();  // 원래 메서드 실행
    }
}