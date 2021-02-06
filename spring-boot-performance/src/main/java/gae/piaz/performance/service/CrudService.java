package gae.piaz.performance.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Generated by Springboot-3layer-Generator at Jan 6, 2021, 8:30:41 PM
 */
public interface CrudService<E, P> {

    E create(E entity);

    E update(E entity);

    Page<E> read(E entity, Pageable pageable);

    E readOne(P primaryKey);

    void delete(P primaryKey);

}