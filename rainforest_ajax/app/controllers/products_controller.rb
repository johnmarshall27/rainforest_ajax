class ProductsController < ApplicationController
  def index
    @products = if params[:search]
      Product.where("LOWER(name) LIKE LOWER(?)", "%#{params[:search]}%")
    else
      Product.all.page(params[:page])
    end

    respond_to do |format|
      format.html do
        if request.xhr?
          render @products
        else
          render 'index'
        end
      end

      format.js { render 'index' }
    end

    # if making a script type AJAX call:
    # can be refactored to
    # respond_to do |format|
    #   format.html
    #   format.js
    # end
  end

  def show
    @product = Product.find(params[:id])

    if current_user
      @review = @product.reviews.build
    end
  end

  def new
    @product = Product.new
  end

  def edit
    @product = Product.find(params[:id])
  end

  def create
    @product = Product.new(product_params)

    if @product.save
      redirect_to products_url
    else
      render :new
    end
  end

  def update
    @product = Product.find(params[:id])

    if @product.update_attributes(product_params)
      redirect_to product_path(@product)
    else
      render :edit
    end
  end

  def destroy
    @product = Product.find(params[:id])
    @product.destroy
    redirect_to products_path
  end

  private
  def product_params
    params.require(:product).permit(:name, :description, :price_in_cents)
  end
end

